const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "dev-secret";
const EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || 60 * 60;

const authSign = (data) => {
    const options = {
        expiresIn: EXPIRATION_TIME
    }
    return jwt.sign(data, SECRET, options);
}

const authVerify = (token) => {
    return jwt.verify(token, SECRET);
}

module.exports = { authSign, authVerify }
