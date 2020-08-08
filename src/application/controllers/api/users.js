const User = require('../../models/user');

exports.readMe = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        await user.populate('boards').execPopulate();
        const boards = user.boards;

        res.status(200).json({ user, boards });
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
};

exports.updateMe = async (req, res) => {
    const userId = req.userId;
    const data = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json();
        }

        Object.keys(data).forEach((update) => {
            user[update] = data[update];
        });
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    }
};

exports.uploadAvatar = async (req, res) => {
    console.log('upload');
    res.status(201).json();
};

exports.readUser = async (req, res) => {
    const userId = req.params.userId;

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
};
