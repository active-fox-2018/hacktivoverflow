const userController = require('../controllers/userController')
const routes = require('express').Router()
const { authorization } = require('../middlewares')

routes.post('/register', userController.register)
routes.post('/login', userController.login)

//TEST
routes.get('/', userController.getAllUsers)
routes.get('/auth', authorization, userController.findOne)

module.exports = routes
