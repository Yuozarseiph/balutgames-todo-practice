import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
      />
      <div className="title">{todo.title}</div>
      <div className="controls">
        <button
          className="btn ghost"
          onClick={() => onToggle(todo._id, todo.completed)}
        >
          {todo.completed ? "Undo" : "Done"}
        </button>
        <button className="btn danger" onClick={() => onDelete(todo._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
