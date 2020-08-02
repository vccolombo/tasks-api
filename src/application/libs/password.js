const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

exports.comparePassword = async (unhashedPassword, hashedPassword) => {
    return await bcrypt.compare(unhashedPassword, hashedPassword);
}
