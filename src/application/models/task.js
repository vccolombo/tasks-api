const mongoose = require('mongoose');
const validator = require('validator');

const TaskStatusEnum = require('./enums/TaskStatusEnum');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: Number,
        required: true,
        enum: Object.values(TaskStatusEnum),
        default: TaskStatusEnum.TODO
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;