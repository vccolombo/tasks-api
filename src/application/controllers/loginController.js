const User = require('../models/userModel');

exports.login = async (req, res, next) => {
    const body = req.body;

    try {
        const user = await User.findByCredentials(
            body.email, body.password
        );
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        // TODO Return a better error
        res.status(400).json(error);
    }
};