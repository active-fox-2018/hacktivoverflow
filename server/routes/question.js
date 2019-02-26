var express = require('express');
var router = express.Router();
const Controller = require('../controllers/QuestionCon')
const { isLogin, checkQues, authUserQues } = require('../middlewares')

router.get('/', Controller.read)
router.post('/', isLogin, Controller.create)
router.get('/:id', checkQues, Controller.findOne)
router.put('/:id', isLogin, checkQues, authUserQues, Controller.update)
router.put('/:id/up', isLogin, checkQues, Controller.upvotes)
router.put('/:id/down', isLogin, checkQues, Controller.downvotes)
router.delete('/:id', isLogin, checkQues, authUserQues, Controller.delete)

module.exports = router;
