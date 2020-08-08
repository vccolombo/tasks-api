const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

exports.comparePassword = (unhashedPassword, hashedPassword) => {
    return bcrypt.compare(unhashedPassword, hashedPassword);
};
