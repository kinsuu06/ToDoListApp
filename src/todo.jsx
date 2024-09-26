import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([{ task: "Sample task", id: uuidv4() }]);
  const [newTodo, setNewTodo] = useState("");

  const updateTodo = (event) => {
    setNewTodo(event.target.value);
  };

  const addTodo = () => {
    if (!newTodo.trim()) return; // Prevent adding empty tasks
    setTodos((prevTodo) => [...prevTodo, { task: newTodo, id: uuidv4() }]);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const upperTodo = () => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) => ({ ...todo, task: todo.task.toUpperCase() }))
    );
  };

  const upperOne = (id) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: todo.task.toUpperCase() };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Todo List
        </h1>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
          placeholder="Add a task"
          value={newTodo}
          onChange={updateTodo}
        />
        <button
          onClick={addTodo}
          className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Add Task
        </button>

        <hr className="my-4" />

        <h3 className="text-xl font-semibold text-gray-700 mb-2">Todo List</h3>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow hover:bg-gray-200 transition-all duration-300"
            >
              <span className="text-gray-800">{todo.task}</span>
              <div className="space-x-2">
                <button
                  onClick={() => upperOne(todo.id)}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition duration-200"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-600 hover:text-red-700 font-semibold transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={upperTodo}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Update All
        </button>
      </div>
    </div>
  );
}
