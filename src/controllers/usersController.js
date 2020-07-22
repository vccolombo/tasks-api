const User = require('../models/userModel');

exports.create = (req, res, next) => {
    const user = new User(req.body);
    user.save().then((result) => {
        res.status(201).json(user);
    }).catch((error) => {
        console.error(error);
        res.status(400).json({
            msg: error.message
        });
    });
}
