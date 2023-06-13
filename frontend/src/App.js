import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './TaskList';
import API_BASE_URL from './config';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    id: '',
    title: '',
    description: '',
    status: '',
    createdAt: '',
  });

  const [showAllTasks, setShowAllTasks] = useState(false);

  const toggleShowAllTasks = () =>{
    setShowAllTasks((prevShowAllTasks) => !prevShowAllTasks );
  }
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`${API_BASE_URL}/api/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  
    console.log('Task(s) Fetched');
  };
  

  const createTask = () => {
    fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewTask({
          
          title: '',
          description: '',
          status: '',
          
        });
        fetchTasks();
      })
      .catch((error) => console.error(error));
  };

  const updateTask = (task, _id) => {
    fetch(`${API_BASE_URL}/api/tasks/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchTasks();
      })
      .catch((error) => console.error(error));
  };
  
  const deleteTask = (task, _id) => {
    fetch(`${API_BASE_URL}/api/tasks/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => fetchTasks())
      .catch((error) => console.error(error));
  };
  

  
  return (
    <div className="app-container">
      <h1>Personal Ticketing System</h1>
      <div className="task-form">

        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Enter task title"
        />

        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Enter task description"
        />

        <input
          type="text"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          placeholder="Enter task status"
        />

      

        <button onClick={createTask}>Add Task</button>
      </div>

      <button onClick ={toggleShowAllTasks}>
        {showAllTasks ? 'Hide Tasks' : 'Show All Tasks'}
      </button>
      {showAllTasks && (  <TaskList tasks={tasks} setTasks={setTasks} onDelete={deleteTask} onUpdate={updateTask} />

      )}
    </div>
  );
}

export default App;
