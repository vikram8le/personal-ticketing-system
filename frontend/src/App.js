import React, { useState, useEffect } from 'react';
import logo from'./tick_track_logo.png';
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

    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amPm = hours>=12 ? 'PM' : 'AM'; 
    const formattedHours = hours >12 ? hours - 12 : hours === 0 ? 12 : hours ;
    const createdAt = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${formattedHours}:${minutes} ${amPm}`;
    
    const taskData = {
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      createdAt: createdAt,
    };

    fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
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
  
  const statusOptions = ["Open", "Work in Progress", "Pending", "Done"];

  
  return (
    <div className="app-container">
      <nav>YOUR PERSONAL TICKETING SYSTEM
      
      </nav>
      <main>
        
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


            <select value = {newTask.status} 
                    onChange ={(e) => setNewTask({ ...newTask, status: e.target.value})}
                    placeholder = "Select task status" 
            >
              <option value =""> Select status </option>
              {statusOptions.map((status, index) => (
                <option key = {index} value={status}>
                  {status}
                </option>
              ))}

            </select>



            <button onClick={createTask}>Add Task</button>
          </div>

          <TaskList tasks={tasks} setTasks={setTasks} onDelete={deleteTask} onUpdate={updateTask} />
      </main>

      <div> 
        <img src ={logo} className='logo'/>
      </div>
      <div className='content1'>
          Content 1
        </div>

        <div className='content2'>
          Content 2
        </div>

        <div className='content3'>
          Content 3
        </div>
      <footer>Footer</footer>

     
     
      

      

   {  /* <button onClick ={toggleShowAllTasks}>
        {showAllTasks ? 'Hide Tasks' : 'Show All Tasks'}
      </button>
      {!tasks.length && !showAllTasks && <p> No Tasks Available</p>}
      {showAllTasks && (  
          
      )}
      */}
      
    </div>
  );
}

export default App;
