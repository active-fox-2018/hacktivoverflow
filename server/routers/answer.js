const router = require('express').Router()
const AnswerController = require('../controllers/answer')
const userAuth = require('../middlewares/user-verify')

router.use(userAuth)

router.post('/:questionId', AnswerController.answerQuestion)

router.patch('/vote/:answerId', AnswerController.voteAnswer)

router.put('/:answerId', AnswerController.editAnswer)

router.delete('/:answerId', AnswerController.deleteAnswer)

module.exports = router