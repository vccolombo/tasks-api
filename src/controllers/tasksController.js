const Task = require('../models/taskModel');

exports.create = async (req, res, next) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });

    try {
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}