const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "dev-secret";

const authSign = (_id) => {
    return jwt.sign({ _id }, SECRET);
}

const authVerify = (token) => {
    return jwt.verify(token, SECRET);
}

module.exports = { authSign, authVerify }
