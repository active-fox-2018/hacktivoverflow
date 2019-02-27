const express = require('express')
const router = express.Router()
const QuestionController = require('../controllers/QuestionController')
const isLogin = require('../middlewares/isLogin')

router.get('/', QuestionController.findAll)
router.get('/:id', isLogin, QuestionController.findById)
router.post('/', isLogin, QuestionController.create)
router.put('/:id', isLogin, QuestionController.edit)
router.put('/upvote/:id', isLogin,  QuestionController.upvote)
router.put('/downvote/:id', isLogin, QuestionController.downvote)
router.delete('/:id', isLogin, QuestionController.delete)
 
module.exports = router 