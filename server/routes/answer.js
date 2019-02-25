var express = require('express');
var router = express.Router();
const userAuth = require('../middlewares/userAuth')
const { createAnswer, findAllAnswers, updateAnswer, findOne } = require('../controllers/answerController')
router.get('/', findAllAnswers)
router.post('/', userAuth, createAnswer)
router.get('/:id', userAuth, findOne)
router.put('/:id', userAuth, updateAnswer )
// router.delete('/:id', userAuth)

module.exports = router;
