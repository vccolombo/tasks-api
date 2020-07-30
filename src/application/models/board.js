const mongoose = require('mongoose');

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

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;