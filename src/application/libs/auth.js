const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev-secret';
const EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || 60 * 60;

exports.authSign = (data) => {
  const options = {
    expiresIn: EXPIRATION_TIME,
  };
  return jwt.sign(data, SECRET, options);
};

exports.authVerify = (token) => {
  return jwt.verify(token, SECRET);
};
