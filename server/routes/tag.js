var express = require('express');
var router = express.Router();
const tagController = require('../controllers/tagController')

router.get('/', tagController.findAll )

module.exports = router