import { useEffect, useState } from "react";
import "./App.css";
import Header from './components/Header.js';
import TaskList from './components/TaskList.tsx';
import TaskInput from './components/TaskInput.tsx';
import Footer from './components/Footer.tsx';
import LoginCard from './components/LoginCard.tsx';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    const fetchTasks = async () => {
      // 1. Si no hay token, no intentamos traer las tareas
      if (!token) return;

      try {
        // 2. Enviamos el token en la cabecera
        const response = await fetch("http://localhost:3000/tasks", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        const data = await response.json();
        
        // 3. Blindaje: Solo guardamos si es exitoso
        if (response.ok) {
          setTasks(data);
        } else {
          // Si el token caducó, cerramos sesión automáticamente
          localStorage.removeItem("token");
          setToken(null);
          setTasks([]);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };
    
    fetchTasks();
  }, [token]); // 4. Agregamos el token a las dependencias para que se ejecute al iniciar sesión

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const addTask = async (text: string) => {    
    const response = await fetch("http://localhost:3000/tasks", {        
      method: "POST",        
      headers: {            
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`        
      },        
      body: JSON.stringify({            
        text: text        
      })    
    });    
    const newTask = await response.json();    
    setTasks([...tasks, newTask]); 
  };

  const deleteTask = async (id: number) => {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const updatedTasks = await response.json();
    setTasks(updatedTasks.tasks);
  };

  const toggleTaskComplete = async (id: number) => {
    
    const currentTask = tasks.find(t => t.id === id);

    if (!currentTask) return;

    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        completed: !currentTask.completed
      })
    });

    const data = await response.json();
    if (data && data.tasks) {
      setTasks(data.tasks); 
    } 
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = (tasks || []).length - completedTasks;

  if (!token) {
    return <LoginCard onLoginSuccess={(validToken) => setToken(validToken)} />;
  }

  return(
    <div className="app-cointainer">
      <div className="user-bar">
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </div>
      <Header />
      <TaskInput onAddTask={addTask} />
      <TaskList 
        tasks={tasks}
        onDeleteTask={deleteTask}
        onToggleComplete={toggleTaskComplete}
      />
      <Footer 
        total={tasks.length}
        completed={completedTasks}
        pending={pendingTasks}
      />
    </div>
  )
}

export default App;
