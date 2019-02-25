var express = require('express');
var router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController')
const errorHandling = require('../middlewares/errorHandling')

router.post('/register', registerUser, errorHandling)
router.post('/login', loginUser, errorHandling)

module.exports = router;
