const mongoose = require('mongoose');

const { builtinModules } = require('module');


const taskSchema = new mongoose.Schema({
    
    title: {type: String, required : true},
    description: {type: String},
    status: {type : String},
    createdAt: {type: Date},

});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
