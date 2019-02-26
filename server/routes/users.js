var express = require('express');
var router = express.Router();
const Controller = require('../controllers/userCon')
const { isLogin } = require('../middlewares')

router.post('/', Controller.create)
router.post('/login', Controller.login)
router.get('/', isLogin, Controller.findOne)
router.put('/', isLogin, Controller.update)
module.exports = router;
