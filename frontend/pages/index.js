import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const login = async () => {
    setLoginError("");
    try {
      const res = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });
      if (!res.ok) {
        let errorData = {};
        try {
          errorData = await res.json();
        } catch {}
        setLoginError(errorData.detail || "Login failed. Please check your credentials.");
        return;
      }
      const data = await res.json();
      setToken(data.access_token);
    } catch (error) {
      setLoginError(error.message);
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:8000/tasks/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [token]);

  const createTask = async () => {
    if (title.trim() === "") return;
    try {
      const res = await fetch("http://localhost:8000/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to create task");
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTaskCompletion = async (task) => {
    try {
      const res = await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const logout = () => {
    setToken("");
    setTasks([]);
    setUsername("");
    setPassword("");
  };

  if (!token) {
    return (
      <>
        <Head>
          <title>TODO App - Login</title>
          <meta name="description" content="Login to access your TODO list" />
        </Head>
        <div className="outer">
          <div className="container">
            <h1>Login</h1>
            <div className="input-row">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="action-button add-button" onClick={login}>
                Login
              </button>
            </div>
            {loginError && <p style={{ color: "red", marginTop: "1rem" }}>{loginError}</p>}
            <button
              className="action-button add-button"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>TODO App</title>
        <meta name="description" content="A modern TODO application" />
      </Head>
      <div className="outer">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>TODO List</h1>
            <button className="action-button logout-button" onClick={logout}>
              Logout
            </button>
          </div>
          <div className="input-row">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="action-button add-button" onClick={createTask}>
              Add Task
            </button>
          </div>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <div>
                  <div className="task-title">{task.title}</div>
                  <div className="task-status">{task.completed ? "Done" : "Pending"}</div>
                </div>
                <div>
                  <button
                    className="action-button delete-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="action-button mark-button"
                    onClick={() => toggleTaskCompletion(task)}
                  >
                    {task.completed ? "Unmark" : "Mark as Completed"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
