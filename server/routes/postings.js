var express = require('express');
var router = express.Router();
const postingController = require('../controllers/postingController')
const access = require('../middlewares/access')
const filterUniqueTag = require('../middlewares/checkUniqueTag')

router.get('/postings', postingController.getAll)

router.post('/postings', access, postingController.create)

router.patch('/postings/:id', access, postingController.upVotes)

router.put('/postings/:id', access, postingController.update)

router.delete('/postings/:id', access, postingController.delete)


module.exports = router;

