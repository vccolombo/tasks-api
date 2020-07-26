const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "dev-secret";

const sign = (_id) => {
    return jwt.sign({ _id }, SECRET);
}

module.exports = { sign }
