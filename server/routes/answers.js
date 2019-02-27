var express = require('express');
var router = express.Router();
const answer = require('../controllers/answers')
const { checkAnswerOwner, isLogin } = require('../middlewares')

router
  .get('/:answerId', answer.getOne)
  .use(isLogin)
  .post('/:questionId', answer.create)
  .put('/vote/:answerId', answer.votes)
  .put('/:answerId', checkAnswerOwner, answer.update)
  .delete('/:answerId', checkAnswerOwner, answer.delete)

module.exports = router;
