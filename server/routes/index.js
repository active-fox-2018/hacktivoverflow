const express = require('express');
const router = express.Router();
const user = require('./users')
const question = require('./question')
const answer = require('./answer')
const userAuth = require('../middlewares/userAuth')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({msg: 'connected . . .'});
});


router.use('/users', user)
router.use('/questions', question)
router.use('/answers', userAuth, answer)

module.exports = router;
