require('dotenv').config()
const nodemailer = require('nodemailer')

function nodeMail(email) {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "dityo.hario@gmail.com",
      pass: process.env.EMAIL_PWD
    }
  });

  var mailOptions = {
    from: "dityo.hario@gmail.com",
    to: email,
    subject: "Weekend Email",
    html:
      `Check out WoverFlow!`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('success')
    }
  });
}

module.exports = nodeMail

