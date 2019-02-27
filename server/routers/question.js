const router = require('express').Router()
const QuestionController = require('../controllers/question')
const userAuth = require('../middlewares/user-verify')

router.get('/find/:questionId', QuestionController.getAQuestion)

router.get('/', QuestionController.getQuestions)

router.get('/topQuestions', QuestionController.topQuestion)

router.use(userAuth)

router.post('/', QuestionController.newQuestion)

router.patch('/vote/:questionId', QuestionController.voteQuestion)

router.patch('/addTags/:questionId', QuestionController.addTags)

router.put('/:questionId', QuestionController.editQuestion)

router.delete('/:questionId', QuestionController.deleteQuestion)

module.exports = router