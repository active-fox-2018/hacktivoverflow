const express = require('express');
const router = express.Router();
const user = require('./users')
const question = require('./question')
const answer = require('./answer')
const userAuth = require('../middlewares/userAuth')
const CronJob = require('cron').CronJob;

let christmas = '0 0 25 12 *'
let christmasPass = '0 0 26 12 *'

let newyear = '0 0 1 1 *'
let newyearPass = '0 0 2 1 *'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({msg: 'connected . . .'});
});

router.get('/celebration', (req, res) => {
  new CronJob(christmas, function() {
    res.status(200).json({condition: true})
  }, null, true, 'America/Los_Angeles');
  
  new CronJob(christmasPass, function() {
    res.status(200).json({condition: false})
  }, null, true, 'America/Los_Angeles');

  new CronJob(newyear, function() {
    res.status(200).json({condition: true})
  }, null, true, 'America/Los_Angeles');

  new CronJob(newyearPass, function() {
    res.status(200).json({condition: false})
  }, null, true, 'America/Los_Angeles');
})


router.use('/users', user)
router.use('/questions', question)
router.use('/answers', userAuth, answer)

module.exports = router;
