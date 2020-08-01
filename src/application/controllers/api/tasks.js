const Task = require('../../models/task');

exports.createTask = async (req, res) => {
    const boardId = req.params.boardId;
    const data = {
        ...req.body,
        board: boardId
    };

    try {
        const task = new Task(data);
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    }
}

// TODO: Reimplement the index route where the result is all the tasks assigned to a user
// Before: I must implement a system that indicates to whom a task is assigned

exports.readTask = async (req, res) => {
    const taskId = req.params.taskId

    try {
        const task = await Task.findById(taskId);
        if(!task) {
            return res.status(404).json();
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}

exports.updateTask = async (req, res) => {
    const taskId = req.params.taskId;
    const data = req.body;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json();
        }

        Object.keys(data).forEach((update) => {
            task[update] = data[update];
        });
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    }
}

exports.deleteTask = async (req, res) => {
    const taskId = req.params.taskId

    try {
        const task = await Task.findByIdAndDelete(taskId);
        if(!task) {
            return res.status(404).json();
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}
