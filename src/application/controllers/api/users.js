const { resizeImage } = require('../../libs/images');
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
    const userId = req.userId;
    const picture = req.file.buffer;

    try {
        const user = await User.findById(userId);
        user.avatar = await resizeImage(picture, 250, 250);
        await user.save();

        res.status(200).json();
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
};

exports.deleteAvatar = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        user.avatar = undefined;
        await user.save();

        res.status(200).json();
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
};

exports.readAvatar = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user || !user.avatar) {
            return res.status(404).json();
        }

        res.set('Content-Type', 'image/jpeg');
        res.send(user.avatar);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(500).json(error);
    }
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
