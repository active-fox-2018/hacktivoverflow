var express = require('express');
var router = express.Router();
const userAuth = require('../middlewares/userAuth')
const { registerUser, loginUser, verifyUser, addTags, removeTags } = require('../controllers/userController')
const errorHandling = require('../middlewares/errorHandling')

router.get('/verify-user', verifyUser, errorHandling)
router.post('/register', registerUser, errorHandling)
router.post('/login', loginUser, errorHandling)
router.patch('/add-tags', userAuth, addTags)
router.patch('/remove-tags', userAuth, removeTags)
module.exports = router;
