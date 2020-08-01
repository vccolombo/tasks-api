const mongoose = require('mongoose');

const Task = require('../models/task');

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

boardSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'board'
});

boardSchema.pre('remove', async function(next) {
    await Task.deleteMany({ board: this._id });

    next();
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;