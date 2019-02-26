var express = require('express');
var router = express.Router();
const Controller = require('../controllers/AnswerCon')
var { checkQues, isLogin, checkAnswer, authUserAnswer } = require('../middlewares')

//ini question id
router.get('/:id', checkQues, Controller.read)
router.post('/:id', isLogin, checkQues, Controller.create)

// ini answer id
router.put('/:id', isLogin, checkAnswer, authUserAnswer, Controller.update)
router.put('/:id/up', isLogin, checkAnswer, Controller.upvotes)
router.put('/:id/down', isLogin, checkAnswer, Controller.downvotes)
router.delete('/:id', isLogin, checkAnswer, authUserAnswer, Controller.delete)

module.exports = router;
