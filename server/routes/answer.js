var express = require('express');
var router = express.Router();
const answerController = require('../controllers/answerController')
const access = require('../middlewares/access')
// const access = require('../helpers/encrypt')

/* GET home page. */
router.post('/', access, answerController.create )

router.patch('/:id', access, answerController.upVotes)

router.put('/:id', access, answerController.edit)

module.exports = router;
