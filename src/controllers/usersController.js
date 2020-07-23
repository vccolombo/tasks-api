const User = require('../models/userModel');

exports.create = async (req, res, next) => {
    // TODO unescape and sanitize the inputs
    const user = new User({
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password
    });

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
        const result = await User.find({});
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
};

exports.show = async (req, res, next) => {
    const _id = req.params.id;

    try {
        const result = await User.findById(_id);
        if (!result) {
            return res.status(404).json({});
        }
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}
