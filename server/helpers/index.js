const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const kue = require('kue')
  , queue = kue.createQueue()

module.exports = {
  hashPass(pass) {
    return bcrypt.hashSync(pass, 10)
  },
  comparePass(pass, hash) {
    return bcrypt.compareSync(pass, hash)
  },
  sign(payload) {
    return jwt.sign(payload, process.env.JWT)
  },
  verify(token) {
    return jwt.verify(token, process.env.JWT)
  },
  createMail() {
    User
      .find()
      .then(users => {
      // let users = [{email: 'obin.aji@gmail.com', name: 'obin'}, {email: 'obien13@gmail.com', name: 'obin aji'}]
        users.forEach(user => {
          queue.create('sendEmail', {
            email: user.email,
            name: user.name
          }).save()
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}