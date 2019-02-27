const nodemailer = require('nodemailer')
const Question = require('../models/question')
const User = require('../models/user')
const kue = require('kue')
const queue = kue.createQueue()
let userEmails = []
console.log('----', User)
Question
    .find({})
    .then((question) => {
        console.log(question)
    })
    .catch((err) => {
    })
User
    .find({})
    .then((users) => {

    })
    .catch(err => {
        console.log(err)
    })

function sendMail() {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'login',
          user: `${process.env.EMAIL}`,
          pass: `${process.env.EMAIL_PASS}`
        }
      });

    var mailOptions = {
    from: `${process.env.EMAIL}`,
    to: 'celynvy6996@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    })
}
sendMail()

module.exports = sendMail
