
import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

function App() {
  const [todos, setTodos] = useState([]); // stores todos from server
  const [name, setName] = useState("");   // input value

  // GET request on component load
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err));
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (!name.trim()) return;

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then(res => res.json())
      .then(newTodo => {
        setTodos([...todos, newTodo]); // update local state
        setName(""); // clear input
      })
      .catch(err => console.error(err));
  };

  // Delete todo 
  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(err => console.error(err));
  };
   
  // Edit todo
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.name);
  };

  const saveEdit = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name: editText }),
    })
    .then(res => res.json())
    .then(updated => {
      setTodos(
        todos.map(todo => 
          todo.id === id ? { ...todo, name: updated.name } : todo
        )
      )
      setEditingId(null);
      setEditText("");
    });
  };

  
  const toggleTodo = (id, completed) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: completed ? 0 : 1 }),
    })
    .then(() => {
      setTodos(
        todos.map(todo => 
          todo.id === id
          ? {...todo, completed: completed ? 0 : 1}
          : todo
        )
      );
    });
  };


  const [editingId, setEditingId] = useState(null); // which todo is being edited
  const [editText, setEditText] = useState(""); // temporary text while editing

 return (
  <div className="app">
    <h1>To Do List</h1>

    <div className="add-todo">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add Task</button>
    </div>

    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
        key={todo.id}
        todo={todo}
        onDelete={deleteTodo}
        onEdit={startEdit}
        onToggle={toggleTodo}
        editingId={editingId}
        editText={editText}
        setEditText={setEditText}
        saveEdit={saveEdit}
        />
      ))}
    </ul>
  </div>
);
 
}

export default App;

