import headerbg from "./bg-dextop-light.jpg";
import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Complete online JavaScript course", completed: true },
    { id: 2, text: "Jog around the park 3x", completed: false },
    { id: 3, text: "10 minutes meditation", completed: false },
    { id: 4, text: "Read for 1 hour", completed: false },
    { id: 5, text: "Pick up groceries", completed: false },
    { id: 6, text: "Complete Todo App on Frontend Mentor", completed: false },
  ]);

  const [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObj: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks(prevTasks => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header with Background */}
      <header
        className="w-full text-white py-6 text-center text-2xl font-bold"
        style={{
          backgroundImage: `url(${headerbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        TODO
      </header>

      {/* Input Field */}
      <div className="w-80 mt-6 bg-white p-4 shadow-md rounded-md flex">
        <input
          type="text"
          placeholder="Create a new todo..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <button onClick={addTask} className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md">
          Add
        </button>
      </div>

      {/* To-Do List */}
      <ul className="w-80 mt-4 bg-white shadow-md rounded-md">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between p-3 border-b last:border-b-0"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5 accent-purple-500"
            />
            <span className={`flex-1 mx-3 ${task.completed ? "line-through text-gray-400" : ""}`}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)} className="text-red-500 text-xl">
              ✖
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="w-80 mt-2 flex justify-between bg-white p-3 shadow-md rounded-md text-gray-500 text-sm">
        <span>{tasks.filter(task => !task.completed).length} items left</span>
        <button
          onClick={() => setTasks(prevTasks => prevTasks.filter(task => !task.completed))}
          className="hover:text-red-500"
        >
          Clear Completed
        </button>
      </div>

      {/* Filters */}
      <div className="w-80 mt-4 flex justify-center space-x-4">
        <button
          className={`px-4 py-1 rounded-md ${filter === "all" ? "bg-blue-500 text-white" : "text-gray-500"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-1 rounded-md ${filter === "active" ? "bg-blue-500 text-white" : "text-gray-500"}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`px-4 py-1 rounded-md ${filter === "completed" ? "bg-blue-500 text-white" : "text-gray-500"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Todo;
