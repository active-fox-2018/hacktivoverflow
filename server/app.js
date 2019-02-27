require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cron = require('node-cron');
const { sendEmail, all } = require('./helpers')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/woverflow', { useNewUrlParser: true })

const userRoute = require('./routes/userRoute')
const questionRoute = require('./routes/questionRoute')
const answerRoute = require('./routes/answerRoute')

const kue = require('kue')
  , queue = kue.createQueue();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

const morning = '0 8 * * *';
// const everyMins = '* * * * *';
const users = [
  { email: 'theresia_c04@yahoo.com' }
]
// console.log(all)

cron.schedule(morning, () => {
  var job = queue.create('email', {
    to: users,
  }).save(function (err) {
    if (!err) console.log(job.id);
  });
});

queue.process('email', (job, done) => {
  job.data.to.forEach(e => {
    sendEmail(e.email, done);
  });
  done()
})

app.use('/', userRoute)
app.use('/questions', questionRoute)
app.use('/answers', answerRoute)

app.listen(port, () => {
  console.log(`listening to port ------ `, port)
})