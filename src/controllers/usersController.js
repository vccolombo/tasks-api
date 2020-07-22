const User = require('../models/userModel');

exports.create = (req, res, next) => {
    const user = new User({
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password
    });

    user.save().then((result) => {
        res.status(201).json(user);
    }).catch((error) => {
        console.error(error);
        res.status(400).json({
            msg: error.message
        });
    });
};
