var express = require('express');
var router = express.Router();
const question = require('../controllers/questions')
const { isLogin, checkQuestionOwner, checkTags } = require('../middlewares')

router
  .get('/', question.getAll)
  .get('/:questionId', question.getOne)
  .use(isLogin)
  .post('/', checkTags, question.create)
  .put('/vote/:questionId', checkTags, question.votes)
  .put('/:questionId', checkQuestionOwner, question.update)
  .delete('/:questionId', checkQuestionOwner, question.delete)

module.exports = router;
