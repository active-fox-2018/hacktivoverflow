var express = require('express');
var router = express.Router();
const userAuth = require('../middlewares/userAuth')
const questionValidation = require('../middlewares/questionValidation')
const {upvote, downvote} = require('../middlewares/voteQuestion')
const errorHandling = require('../middlewares/errorHandling')
const { 
    createQuestion, 
    findAllQuestion, 
    deleteQuestion, 
    updateQuestion, 
    upvoteQuestion, 
    downvoteQuestion,
    findAllUserQuestions,
    findOne } = require('../controllers/questionController')

router.get('/', findAllQuestion)
router.get('/user', userAuth, findAllUserQuestions)
router.get('/:id', findOne)
router.use(userAuth)
router.post('/', createQuestion, errorHandling)
router.patch('/upvote/:id', questionValidation, upvote, upvoteQuestion)
router.patch('/downvote/:id', questionValidation, downvote, downvoteQuestion)
router.put('/:id', updateQuestion)
router.delete('/:id', deleteQuestion)

module.exports = router;
