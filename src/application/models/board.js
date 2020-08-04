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
}, {
    timestamps: true
});

// Using reference here was a bad choice
// As this is a one-to-many relation (one board has many tasks, and one task has only one board)
// I could have just nested the tasks inside the board. It would facilitate queries for example.
// However I won't change this for now as it is not broken, but may be something to fix for the future
// Why: Now I am querieng the entire tasks collection looking for a specific task in a specific board
// When I ALREADY HAVE THE BOARD. Really bad perfomance in a real scenario
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