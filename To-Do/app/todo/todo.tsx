import { useState, useEffect } from "react";
import headerbgLight from "./bg-mobile-light.jpg";
import headerbgDark from "./bg-mobile-dark.jpg";
import darkmodeIcon from "./icon-moon.svg";
import lightmodeIcon from "./icon-sun.svg";
import markedDoneIcon from "./icon-check.svg";

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
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
    <div
      className={`min-h-screen flex flex-col items-center ${darkMode ? "bg-gray-900 text-white" : "bg-white-100 text-black"}`}
      style={{
        backgroundImage: `url(${darkMode ? headerbgDark : headerbgLight})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      

      <div className="w-80 mt-6 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md flex flex-col">
      
      <header className="w-full flex justify-between items-center p-6 text-2xl font-bold text-white">
        <span>TODO</span>
        <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
  <img
    src={darkMode ? lightmodeIcon : darkmodeIcon}
    alt={darkMode ? "Light Mode" : "Dark Mode"}
    className="w-6 h-6"
  />
</button>
      </header>
<div>
        <input
          type="text"
          placeholder="Create a new todo..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && newTask.trim()) {
              setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
              setNewTask("");
            }
          }}
          className="w-full p-2 rounded-md dark:bg-gray-700 dark:text-white"
        />
        </div>
      </div>

      <ul className="w-80 mt-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
        {filteredTasks.map(task => (
          <li key={task.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
<input
  type="checkbox"
  checked={task.completed}
  onChange={() => toggleTask(task.id)}
  className="w-5 h-5 border-2 rounded-full cursor-pointer"
  style={{
    backgroundImage: task.completed
      ? `url(${markedDoneIcon}), linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))`
      : "none",
    backgroundSize: "100% auto, cover", 
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderColor: task.completed ? "transparent" : "#9ca3af",
  }}
/>





            <span className={`flex-1 mx-3 ${task.completed ? "line-through text-gray-400" : ""}`}>{task.text}</span>
            <button onClick={() => removeTask(task.id)} className="text-red-500 text-xl">✖</button>
          </li>
        ))}
      </ul>

      <div className="w-80 mt-2 flex justify-between bg-white dark:bg-gray-800 p-3 shadow-md rounded-md text-gray-500 text-sm">
        <span>{tasks.filter(task => !task.completed).length} items left</span>
        <button onClick={() => setTasks(tasks.filter(task => !task.completed))} className="hover:text-red-500">
          Clear Completed
        </button>
      </div>

      <div className="w-80 mt-4 flex justify-center space-x-4">
        <button className={`px-4 py-1 rounded-md ${filter === "all" ? "text-blue-900" : "text-grey-500"}`} onClick={() => setFilter("all")}>All</button>
        <button className={`px-4 py-1 rounded-md ${filter === "active" ? "text-blue" : "text-gray-500"}`} onClick={() => setFilter("active")}>Active</button>
        <button className={`px-4 py-1 rounded-md ${filter === "completed" ? "text-blue" : "text-gray-500"}`} onClick={() => setFilter("completed")}>Completed</button>
      </div>
    </div>
  );
};

export default Todo;
