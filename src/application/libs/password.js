const bcrypt = require('bcrypt');

const hash = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

module.exports = { hash };