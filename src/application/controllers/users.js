const User = require('../models/user');

exports.create = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    }
}

exports.login = async (req, res) => {
    const body = req.body;

    try {
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        
        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    }
}

exports.logout = async (req, res) => {
    res.status(200).json({ token: null });
}

exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        await user.populate('boards').execPopulate();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
}

exports.show = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
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

exports.update = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json();
        }

        Object.keys(req.body).forEach((update) => {
            user[update] = req.body[update];
        });
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    }
}
