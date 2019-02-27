const answerController = require('../controllers/answerController')
const routes = require('express').Router()

const { authorization } = require('../middlewares')

routes.post('/', authorization, answerController.create)

routes.get('/upvotes/:answerId', authorization, answerController.upvotes)
routes.get('/downvotes/:answerId', authorization, answerController.downvotes )

routes.get('/:questionId', answerController.read)
routes.put('/:answerId', authorization, answerController.update)



module.exports = routes
