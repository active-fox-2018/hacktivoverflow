const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const User = require('../models/user')

let all = null;

module.exports = {
  generateToken: function (id, username, email) {
    return jwt.sign({
      id: id,
      username: username,
      email: email
    }, process.env.jwt_secret)
  },

  hashPassword: function (password) {
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash
  },

  decodePassword: function (password, databasePswrd) {
    // console.log(password, databasePswrd)
    return bcrypt.compareSync(password, databasePswrd);
  },

  sendEmail(email) {
    //SMTP FOR EMAIL -------------------------------
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "activefox.carrental@gmail.com",
        pass: "carrental123"
      }
    });
    var mailOptions = { 
      from: "activefox.carrental@gmail.com",
      to: `${email}`,
      subject: "Weekend Email",
      html: 
      `Check out WoverFlow!`
    }
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error)
      } else {
        console.log('success')
      }
    });
  }, 

  allUsers() {
    User
      .find({})
      .then(data => {
        all = data
      })
      .catch(err => {
        console.log(err)
      })
  },

}