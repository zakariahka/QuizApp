const jwt = require('jsonwebtoken');

const createToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = createToken;
