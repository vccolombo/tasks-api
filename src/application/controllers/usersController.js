const User = require('../models/userModel');

exports.create = async (req, res, next) => {
    // TODO unescape and sanitize the inputs
    const user = new User(req.body);

    try {
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    }
};

exports.index = async (req, res, next) => {
    try {
        const users = await User.find({});

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
};

exports.show = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json();
        }
        
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json();
        }

        Object.keys(body).forEach((update) => {
            user[update] = body[update];
        });
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    }
}
