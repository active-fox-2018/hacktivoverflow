var express = require('express');
var router = express.Router();
const userAuth = require('../middlewares/userAuth')
const errorHandling = require('../middlewares/errorHandling')
const { 
    createQuestion, 
    findAllQuestion, 
    deleteQuestion, 
    updateQuestion, 
    upvote, 
    downvote, 
    findOne } = require('../controllers/questionController')

router.get('/', findAllQuestion)
router.get('/:id', findOne)
router.post('/', userAuth, createQuestion, errorHandling)
router.put('/:id', userAuth, updateQuestion)
router.delete('/:id', userAuth, deleteQuestion)

module.exports = router;
