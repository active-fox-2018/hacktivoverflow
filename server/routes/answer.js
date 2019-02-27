var express = require('express');
var router = express.Router();
const answerValidation = require('../middlewares/answerValidation')
const { upvote, downvote } = require('../middlewares/voteAnswer')
const { createAnswer, 
        findOneAnswer, 
        upvoteAnswer, 
        downvoteAnswer } = require('../controllers/answerController')

router.get('/:answerId', findOneAnswer)
router.post('/:questionId', createAnswer)
router.patch('/upvote/:id', answerValidation, upvote, upvoteAnswer)
router.patch('/downvote/:id', answerValidation, downvote, downvoteAnswer)

module.exports = router;
