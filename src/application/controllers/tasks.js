const Task = require('../models/task');

exports.create = async (req, res) => {
    try {
        const task = new Task(req.body);
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
    const id = req.params.id;

    try {
        const task = await Task.findById(id);
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
    const id = req.params.id;
    const body = req.body;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json();
        }

        Object.keys(body).forEach((update) => {
            task[update] = body[update];
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
    const id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(id);
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
