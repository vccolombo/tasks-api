const jwt = require('jsonwebtoken');

const { authVerify } = require('../libs/auth');
const User = require('../models/userModel');

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = authVerify(token);
        
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ "error": "Authentication failed" });
    }
}