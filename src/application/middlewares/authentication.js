const { authVerify } = require('../libs/auth');

exports.verifyAuthentication = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        const validated = authVerify(token);
        req.userId = validated._id;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ "error": "Authentication failed" });
    }
}
