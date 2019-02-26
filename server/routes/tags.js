var express = require('express');
var router = express.Router();
const tag = require('../controllers/tags')

router
  .get('/', tag.getAll)
  .post('/', tag.create)

module.exports = router;
