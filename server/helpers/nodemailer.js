"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
function main(data, done){
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PASS
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Obien Overflow 👻" <${process.env.MY_EMAIL}>`, // sender address
    to: data.email, // list of receivers
    subject: "It's Monday.. ✔", // Subject line
    text: `Hello ${data.name}... It's Monday, let's make some new questions...`, // plain text body
    html: `<b>Hello ${data.name}... It's Monday, let's make some new questions...</b>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      done()
    }
  })
}

module.exports = main