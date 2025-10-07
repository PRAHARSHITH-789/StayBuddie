const jwt = require('jsonwebtoken');

const generateToken = (hostel_id) => {
  return jwt.sign({ id: hostel_id }, "hello");
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken,verifyToken };
