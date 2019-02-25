const express = require('express');
const router = express.Router();
const user = require('./users')
const question = require('./question')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({msg: 'connected . . .'});
});


router.use('/users', user)
router.use('/questions', question)

module.exports = router;
