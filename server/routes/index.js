const router = require('express').Router()
const UserController = require('../controllers/UserController')
const QuestionController = require('../controllers/QuestionController')
const AnswerController = require('../controllers/AnswerController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/search', QuestionController.findWhere)
router.get('/questions', QuestionController.findAll)
router.get('/questions/:id', QuestionController.findOne)
router.get('/answers/:id', AnswerController.findOne)
router.use(authentication)
router.post('/authentication', function(req, res) {
  if(req.userAuthentic._id) {
    res.status(200).json({id: req.userAuthentic._id})
  }
})

router.get('/user/questions', QuestionController.findByUser)
router.post('/questions', QuestionController.create)
router.patch('/questions/:id/:vote', QuestionController.vote)
router.put('/questions/:id', QuestionController.update)
router.delete('/questions/:id', QuestionController.removeQuestion)

router.get('/user/answers', AnswerController.findAllByUser )
router.post('/answers', AnswerController.create)
router.put('/answers/:id', AnswerController.update)
router.patch('/answers/:id/:vote', AnswerController.vote)


module.exports = router