const express = require('express');
const router =  express.Router();
const Task = require('./task');




//Create a task
router.post('/api/tasks', (req, res) => {
    const{title, description,status} = req.body;
    
    const createdAt = new Date();

    const task = new Task( {title, description,status, createdAt} );

    task.save()
    .then( (savedTask) => res.status(201).json(savedTask))
    .catch( (error) => res.status(500).json( { error: 'Failed to create a task'}));
});
//Get all Tasks
router.get('/api/tasks', (req, res) => {
    Task.find()
    .then( (tasks) => res.json(tasks))
    .catch((error) => res.status(500).json( { error: 'Failed to fetch tasks'}));
});

//Update a task
router.put('/api/tasks/:_id', (req, res) => {
    const {_id} = req.params;
    const {title, description,status} = req.body;

    Task.findByIdAndUpdate( _id, {title, description,status}, {new: true})
    .then( (updatedTask) => {
        if(!updatedTask) {
            return res.status(404).json({ error: 'Task not found'});
        }
        res.json(updatedTask);
    })
    .catch( (error) => res.status(500).json({ error: 'Failed to update the task'}));
});

//Delete a task
router.delete('/api/tasks/:_id', (req, res) => {
    console.log('Delete request received');
    const {_id} = req.params;

    Task.findByIdAndDelete(_id)
    .then((deletedTask) => {
        if(!deletedTask) {
            return res.status(404).json({error: 'Task not found'});
        }

        
        res.json({ message: 'Task deleted successfully'});
    })
    .catch((error) => res.status(500).json({ error : 'Failed to delete the task'}));
});


module.exports = router;