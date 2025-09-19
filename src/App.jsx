import { useState } from "react";
import "./styles.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.trim()) {
      setTodos([
        ...todos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]);
      setNewItem("");
    }
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => !todo.completed)
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todo-app">
      <h1 className="todo-header">todos</h1>
      <div className="list">
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
            className="input1"
            placeholder="What needs to be done?"
            autoFocus
          />
        </div>
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  className={
                    todo.completed ? "todo-title completed" : "todo-title"
                  }
                >
                  {todo.title}
                </span>
              </label>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                type="button"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        <div className="todo-footer">
          <span className="items-left">{itemsLeft} items left!</span>
          <div className="filter-buttons">
            <button
              className={filter === "All" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter("All")}
              type="button"
            >
              All
            </button>
            <button
              className={
                filter === "Active" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setFilter("Active")}
              type="button"
            >
              Active
            </button>
            <button
              className={
                filter === "Completed" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setFilter("Completed")}
              type="button"
            >
              Completed
            </button>
          </div>
          <button
            className="clear-completed-btn"
            onClick={clearCompleted}
            type="button"
          >
            Clear completed
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}