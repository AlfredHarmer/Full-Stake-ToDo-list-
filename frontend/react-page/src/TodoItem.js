import React from "react";

function TodoItem({
  todo,
  onDelete,
  onEdit,
  onToggle,
  editingId,
  editText,
  setEditText,
  saveEdit
}) {
  return (
    <li className="todo-item">
      {editingId === todo.id ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={() => saveEdit(todo.id)}>💾</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed === 1}
            onChange={() => onToggle(todo.id, todo.completed)}
          />
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.name}
          </span>
          <button onClick={() => onEdit(todo)}>✏️</button>
        </>
      )}

      <button onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  );
}

export default TodoItem;