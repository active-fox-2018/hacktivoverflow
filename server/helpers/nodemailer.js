var nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
function sendEmail(user){
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email, // generated ethereal user
      pass: process.env.password // generated ethereal password
    }
  });
  // setup email data with unicode symbols
  let mailOptions = {
    from: 'hacktivoverflow@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: "Have you answer question this Month?", // Subject line
    text: "There's a new question to answers", // plain text body
    html: "<b>There's a new question to answers</b>" // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, done) {
    if(error){
      console.log(error)
    } else {
      done()
    }
  })
}

module.exports = sendEmail