const bcrypt = require('bcrypt');

const hash = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

const compare = (unhashedPassword, hashedPassword) => {
    return bcrypt.compare(unhashedPassword, hashedPassword);
}

module.exports = { hash, compare };