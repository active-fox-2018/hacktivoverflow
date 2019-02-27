const User = require('../models/User')
const bcrypt = require('bcrypt')
const { jwtSign } = require('../helpers/jwt')

class userController {
  static register(req, res, next) {
    User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        let token = jwtSign({
          _id: user._id,
          email: user.email,
          role: user.role
        })

        res
          .status(201)
          .json({
            message: "registration success",
            data: user,
            token
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: "internal server error",
            err
          })
      })
  }

  static login(req, res, next) {

    if (!req.body.email) {
      res
        .status(404)
        .json({
          message: "email can't be empty"
        })
    } else if (!req.body.password) {
      res
        .status(404)
        .json({
          message: "password can't be empty"
        })
    }

    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwtSign({
              email: user.email
            })
            res
              .status(200)
              .json({
                message: "sign in success",
                token,
                data: user
              })
          } else {
            res
              .status(404)
              .json({
                message: "email/password not found"
              })
          }
        } else {
          res
            .status(404)
            .json({
              message: "email not registered"
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({
            message: "Bad Request",
            err
          })
      })
  }
}


module.exports = userController