const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  sign(user) {
    return jwt.sign(user, process.env.JWT_SECRET)
  },
  verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
