const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

const comparePassword = (unhashedPassword, hashedPassword) => {
    return bcrypt.compare(unhashedPassword, hashedPassword);
}

module.exports = { hashPassword, comparePassword }