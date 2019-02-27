const router = require('express').Router()
const TagController = require('../controllers/tag')

router.get('/:name', TagController.getTags)

module.exports = router