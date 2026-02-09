import React from "react";

function TodoItem({ todo, onDelete, onEdit, onToggle }) {
    return (
        <li className="todo-item">
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            />

            <span className={todo.completed ? "completed" : ""}>
                 {todo.name}
            </span>

           

            <button onClick={() => onEdit(todo)}>✏️</button>
            <button onClick={() => onDelete(todo.id)}>❌</button>
        </li>
    );
}

export default TodoItem;