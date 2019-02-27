require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const cors = require('cors')
const routes = require('./routes/index')
const weeklyReport = require('./helpers/nodemailer')
const cron = require('node-cron')
const kue = require('kue')
const queue = kue.createQueue()
const everyFriday = '0 0 * * 5'
const app = express()
const port = process.env.PORT
const run = process.env.NODE_ENV

const mongoose = require('mongoose')
const databaseName = 'hackverflow'
const db = mongoose.connection
mongoose.connect(`mongodb://localhost:27017/${databaseName}-${run}`, {useNewUrlParser : true})

mongoose.set('useCreateIndex', true)
db.on('error', console.error.bind(console, 'conection err:'))
db.once('open', function() {})

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cors())

cron.schedule('* * * * 5', () => {
  console.log('====')
  weeklyReport()
})

queue.process('weekly-report', function(job, done){
  let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.email,
      pass: process.env.emailPass
      }
    }))
    
    var mailOptions = {
      from: 'hackverflowmaria@gmail.com',
      to: '',
      subject: 'Weekly Report',
      text: ''
      }
      console.log(job.data)
    // transporter.sendMail(job.data, function(error, info){
    //   if (error) {
    //     console.log(error)
    //   } else {
    //     console.log(job.data, '+++++')
    //     console.log('Email sent: ' + info.response, '================')
    //     done()
    //   }
    // })
})

app.use('/', routes)
app.listen(port, function() {
  console.log(`this is port ${port}...`)
})

module.exports = app