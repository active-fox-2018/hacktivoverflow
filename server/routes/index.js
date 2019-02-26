const express = require('express')
const router = express.Router()
const GoogleController = require('../controllers/google')
const userRoutes = require('./user')
const questionRoutes = require('./question')
const answerRoutes = require('./answer')
const qaTagRoutes = require('./qatag')

router.use('/api/questions', questionRoutes)
router.use('/api/answers', answerRoutes)
router.use('/api/qatags', qaTagRoutes)
router.use('/api/users', userRoutes)
router.get('/api/googleloginverify', GoogleController.loginVerify)

router.get('/*', (req, res) => {
    res.status(404).json({ messsage: 'page not found' })
})

module.exports = router
