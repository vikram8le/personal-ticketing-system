import React, { useState } from 'react';
import API_BASE_URL from './config';

function TaskList({ tasks, setTasks, taskType }) {
  const [editedTasks, setEditedTasks] = useState([]);

  const handleEdit = (taskId) => {
    setEditedTasks((prevEditedTasks) => [
      ...prevEditedTasks,
      { _id: taskId, isEditing: true },
    ]);
  };

  const handleCancel = (taskId) => {
    setEditedTasks((prevEditedTasks) =>
      prevEditedTasks.filter((editedTask) => editedTask._id !== taskId)
    );
  };

  const handleUpdate = (taskId) => {
    const editedTask = editedTasks.find((task) => task._id === taskId);
    if (editedTask) {
      const { title, description, status } = editedTask;
      fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, status }),
      })
        .then((response) => response.json())
        .then((updatedTask) => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === updatedTask._id ? updatedTask : task
            )
          );
          setEditedTasks((prevEditedTasks) =>
            prevEditedTasks.map((task) =>
              task._id === updatedTask._id
                ? { ...task, isEditing: false }
                : task
            )
          );
        })
        .catch((error) => {
          console.error('Error updating task:', error);
        });
    }
  };

  const handleDelete = (_id) => {
    fetch(`${API_BASE_URL}/api/tasks/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== _id)
        );
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const isTaskEditing = (taskId) => {
    const editedTask = editedTasks.find((task) => task._id === taskId);
    return editedTask ? editedTask.isEditing : false;
  };

  const getEditedTaskValue = (taskId, field) => {
    const editedTask = editedTasks.find((task) => task._id === taskId);
    return editedTask ? editedTask[field] : '';
  };

  return (
    <div className="new-task">
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          {isTaskEditing(task._id) ? (
            <>
              <input
                type="text"
                value={getEditedTaskValue(task._id, 'title')}
                onChange={(e) =>
                  setEditedTasks((prevEditedTasks) =>
                    prevEditedTasks.map((t) =>
                      t._id === task._id ? { ...t, title: e.target.value } : t
                    )
                  )
                }
              />
              <input
                type="text"
                value={getEditedTaskValue(task._id, 'description')}
                onChange={(e) =>
                  setEditedTasks((prevEditedTasks) =>
                    prevEditedTasks.map((t) =>
                      t._id === task._id
                        ? { ...t, description: e.target.value }
                        : t
                    )
                  )
                }
              />
              <input
                type="text"
                value={getEditedTaskValue(task._id, 'status')}
                onChange={(e) =>
                  setEditedTasks((prevEditedTasks) =>
                    prevEditedTasks.map((t) =>
                      t._id === task._id ? { ...t, status: e.target.value } : t
                    )
                  )
                }
              />
              <button onClick={() => handleCancel(task._id)}>Cancel</button>
              <button onClick={() => handleUpdate(task._id)}>Update</button>
            </>
          ) : (
            <div className='task-list'>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Created At: {task.createdAt}</p>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
              <button onClick={() => handleEdit(task._id)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
