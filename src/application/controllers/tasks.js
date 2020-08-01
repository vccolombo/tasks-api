const Task = require('../models/task');

exports.create = async (req, res) => {
    const userId = req.userId;
    const data = req.body;

    try {
        const task = new Task(data);

        const authorized = await isAuthorized(task, userId);
        if (!authorized) {
            return res.status(403).json();
        }

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

exports.show = async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId

    try {
        const task = await Task.findById(taskId);
        if(!task) {
            return res.status(404).json();
        }

        const authorized = await isAuthorized(task, userId);
        if (!authorized) {
            return res.status(403).json();
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}

exports.update = async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
    const data = req.body;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json();
        }

        const authorized = await isAuthorized(task, userId);
        if (!authorized) {
            return res.status(403).json();
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

exports.destroy = async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId

    try {
        const task = await Task.findById(taskId);
        if(!task) {
            return res.status(404).json();
        }

        const authorized = await isAuthorized(task, userId);
        if (!authorized) {
            return res.status(403).json();
        }

        await task.remove();

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}

const isAuthorized = async (task, userId) => {
    await task.populate('board').execPopulate();
    const authorized = task.board.owner.toString() === userId;
    await task.depopulate('board');

    return authorized;
}
