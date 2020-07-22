const Task = require('../models/taskModel');

exports.create = (req, res, next) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });
    
    task.save().then((result) => {
        res.status(201).json(task);
    }).catch((error) => {
        console.error(error);
        res.status(400).json({
            msg: error.message
        });
    })
}