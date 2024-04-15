import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const authHeader = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    fetchTodo();
  }, []);
  const fetchTodo = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/api/todo", {
        headers: authHeader,
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/todo",
        newTask,
        { headers: authHeader }
      );
      setTasks([...tasks, response.data]);
      setNewTask({
        title: "",
        description: "",
      });
    } catch (error) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
    }
  };

  const handleEditTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/todo/${editingTaskId}`,
        newTask,
        { headers: authHeader }
      );
      const updatedTasks = tasks.map((task) =>
        task._id === editingTaskId ? response.data : task
      );
      setTasks(updatedTasks);
      setEditingTaskId(null);
      setNewTask({
        title: "",
        description: "",
      });
    } catch (error) {
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
    }
  };

  const handleEditButtonClick = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    setEditingTaskId(taskId);
    setNewTask({
      title: taskToEdit.title,
      description: taskToEdit.description,
    });
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/${taskId}`, {
        headers: authHeader,
      });
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="home">
      <div className="navbar">
        <h1 className="navbar-heading">To-Do</h1>
        <img
          src="../images/logout.svg"
          alt="logout"
          className="logout-icon"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        />
      </div>
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Title"
          className="add-task-input"
          value={newTask.title}
          onChange={(e) => {
            setNewTask({ ...newTask, title: e.target.value });
          }}
        />
        <textarea
          placeholder="Description"
          className="add-task-input"
          value={newTask.description}
          onChange={(e) => {
            setNewTask({ ...newTask, description: e.target.value });
          }}
        />
        {editingTaskId ? (
          <button className="add-task-button" onClick={handleEditTask}>
            Edit Task
          </button>
        ) : (
          <button className="add-task-button" onClick={handleAddTask}>
            Add Task
          </button>
        )}
      </div>
      <div className="task-container">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <h2 className="task-title">{task.title}</h2>
            <p className="task-description">{task.description}</p>
            <div className="task-del-edit-container">
              <button
                className="task-delete-button"
                onClick={() => handleEditButtonClick(task._id)}
              >
                Edit
              </button>
              <button
                className="task-delete-button"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
