var express = require('express');
var router = express.Router();
const user = require('../controllers/users')
const { isLogin, checkTags } = require('../middlewares')

router
  .post('/verifyToken', user.verifyToken)
  .post('/login', user.login)
  .post('/register', user.register)
  .put('/users', isLogin, checkTags, user.updateTags)

module.exports = router;
