const User = require('../models/userModel');

exports.create = (req, res, next) => {
    // TODO unescape and sanitize the inputs
    const user = new User({
        username: req.body.username,
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
        res.status(500).json(error);
    });
};

exports.show = (req, res, next) => {
    // TODO unescape and sanitize the inputs
    const username = {
        username: req.params.username
    }

    User.findOne(username).then((user) => {
        if (!user) {
            return res.status(404).json({});
        }
        res.status(200).json(user);
    }).catch((error) => {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    });
}
