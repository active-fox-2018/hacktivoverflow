var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const questionRouter = require('./questions')
const answerRouter = require('./answers')
const tagRouter = require('./tags')
const { isLogin } = require('../middlewares')

router
  .use(userRouter)
  .use('/questions', questionRouter)
  .use(isLogin)
  .use('/answers', answerRouter)
  .use('/tags', tagRouter)

module.exports = router;
