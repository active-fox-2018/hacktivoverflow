var express = require('express');
var router = express.Router();
const user = require('../controllers/users')

router
  .post('/verifyToken', user.verifyToken)
  .post('/login', user.login)
  .post('/register', user.register)

module.exports = router;
