const User = require('../models/userModel');

exports.create = (req, res, next) => {
    // TODO unescape and sanitize the inputs
    const user = new User({
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password
    });

    user.save().then((result) => {
        // TODO Think if it is returning too much information
        res.status(201).json(user);
    }).catch((error) => {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    });
};

exports.index = (req, res, next) => {
    User.find({}).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    });
};
