const questionController = require('../controllers/questionController')
const routes = require('express').Router()
const { authorization } = require('../middlewares')

routes.post('/add', authorization, questionController.create)
routes.get('/read', questionController.read)
routes.get('/me', authorization, questionController.findByUserId )

routes.get('/upvote/:questionId', authorization, questionController.upvotes)
routes.get('/downvote/:questionId', authorization, questionController.downvotes)

routes.get('/:questionId', questionController.findOne)
routes.put('/:questionId', authorization, questionController.update)
routes.delete('/:questionId', authorization, questionController.delete)


module.exports = routes