const router = require('express').Router();
const QuestionController = require('../controllers/QuestionController');
const {authentication, authorizationQuestion} = require('../middlewares/verify');

router.get('/findById/:id', QuestionController.findById);
router.get('/', QuestionController.find);
router.use(authentication);
router.post('/', QuestionController.create);
router.put('/vote/:id', QuestionController.vote);
router.use('/:id', authorizationQuestion);
router.put('/:id', QuestionController.update);
router.delete('/:id', QuestionController.remove);

module.exports = router;