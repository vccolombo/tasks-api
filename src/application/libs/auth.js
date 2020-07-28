const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "dev-secret";

const authSign = (data) => {
    return jwt.sign(data, SECRET);
}

const authVerify = (token) => {
    return jwt.verify(token, SECRET);
}

module.exports = { authSign, authVerify }
