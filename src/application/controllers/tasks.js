const Task = require('../models/task');

exports.create = async (req, res) => {
    const data = req.body;

    // TODO do something about the user being able to create
    // tasks in boards they do not own (validate the board ownership)

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

exports.index = async (req, res) => {
    try {
        const tasks = await Task.find({});

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}

exports.show = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json();
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}

exports.update = async (req, res) => {
    const taskId = req.params.id;
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

exports.destroy = async (req, res) => {
    const taskId = req.params.id

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
