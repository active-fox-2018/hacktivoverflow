const router = require('express').Router();
const AnswerController = require('../controllers/AnswerController');
const {authentication, authorizationAnswer} = require('../middlewares/verify');

router.get('/', AnswerController.find);
router.get('/question/:id', AnswerController.findByQuestion);
router.use(authentication);
router.put('/vote/:id', AnswerController.vote);
router.post('/', AnswerController.create);
router.use(':id',authorizationAnswer);
router.put('/:id', AnswerController.update);
router.delete('/:id', AnswerController.remove);

module.exports = router;