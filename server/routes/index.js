var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const questionRouter = require('./questions')
const answerRouter = require('./answers')
const tagRouter = require('./tags')

router
  .use(userRouter)
  .use('/questions', questionRouter)
  .use('/answers', answerRouter)
  .use('/tags', tagRouter)

module.exports = router;
