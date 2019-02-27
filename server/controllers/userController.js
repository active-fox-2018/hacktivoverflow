const User = require('../models/user')
const { generateToken, hashPassword, decodePassword, sendEmail } = require('../helpers')

class UserController {

  static register(req, res) {
    // console.log(`registration --- `, req.body)
    req.body.password = hashPassword(req.body.password)
    User
      .create(req.body)
      .then(newUser => {
        res.status(201).json({
          msg: `registration success`,
          data: newUser
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

  static login(req, res) {
    // console.log(`login ---- `, req.body)
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          let matchPassword = decodePassword(req.body.password, user.password)
          if (matchPassword) {
            res.status(200).json({
              msg: `login success`,
              token: generateToken(user._id, user.username, user.email)
            })
          } else {
            res.status(404).json({
              msg: `Wrong username / password`
            })
          }
        } else {
          res.status(404).json({
            msg: `Wrong username / password`
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

  static findOne(req, res) {
    // console.log(req.decoded)
    User
      .findOne({
        email: req.decoded.email
      })
      .then(user => {
        res.status(200).json({
          msg: `user found`,
          data: user
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

  //TEST
  static getAllUsers(req, res) {
    User
      .find()
      .then(allUsers => {
        res.json(allUsers)
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }

}

module.exports = UserController