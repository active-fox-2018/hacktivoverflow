require('dotenv').config()

const express = require('express')
const UserRoute = require('./routers/user')
const TagRoute = require('./routers/tag')
const QuestionRoute = require('./routers/question')
const AnswerRoute = require('./routers/answer')
const cors = require('cors')
const cron = require('node-cron');
const kue = require('kue')
const queue = kue.createQueue()
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');

let reportTime = '0 18 1/1 * *'
app.use(cors())

mongoose.connect('mongodb://localhost:27017/minioverflow', {useNewUrlParser: true});

app.use(express.urlencoded({extended: true}))
app.use(express.json())

cron.schedule(reportTime, () => {
    sendEmailNotif()
})

app.use('/users', UserRoute)
app.use('/tags', TagRoute)
app.use('/questions', QuestionRoute)
app.use('/answers', AnswerRoute)


app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})