var express = require('express')
var router = express.Router()
var AnswerController = require('../controllers/AnswerController')
var isLogin = require('../middlewares/isLogin') 

router.use(isLogin)

router.post('/', AnswerController.create)
router.get('/:questionId', AnswerController.findByQuestionId)
router.put('/upvote/:id', AnswerController.upvote)
router.put('/downvote/:id', AnswerController.downvote)
router.put('/:id', AnswerController.edit)
router.delete('/:id', AnswerController.delete)

module.exports = router