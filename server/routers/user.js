const router = require('express').Router()
const UserController = require('../controllers/user')
const userAuth = require('../middlewares/user-verify')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.use(userAuth)

router.patch('/tags', UserController.addWatchedTag)

router.get('/tags', UserController.getWatchedTag)

module.exports = router