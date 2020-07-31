const User = require('../models/user');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);
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
