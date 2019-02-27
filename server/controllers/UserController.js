const User = require('../models/user');
const hashPassword = require('../helpers/hashPassword');
const jsonwebtoken = require('../helpers/jsonwebtoken');

class UserController {
  static login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if(user){
          if(!req.body.password){
            let errorMessage = {
              error: `please input password`
            }
            res.status(400).json(errorMessage)
          }
          if(user.password === hashPassword(req.body.password)){
            let convertToken = {
              _id: user._id,
              emai: user.email,
              name: user.name
            }
            let token = jsonwebtoken.sign(convertToken);
            let messageLogin = {
              message: `Welcome ${user.name}`,
              token: token,
              data: convertToken
            }
            res.status(200).json(messageLogin);
          }
          else {
            res.status(400).json({error: 'Wrong password'});
          }
        }
        else {
          let errorMessage = {
            error: `Wrong email`
          }
          res.status(400).json(errorMessage);
        }
      })
      .catch(error => {
        let errorMessage = {
          error: error.message,
          fullError: error
        }
        res.status(500).json(errorMessage)
      })
  }

  static register(req,res) {
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password)
      })
      .then(user => {
        let registerMessage = {
          message: `${req.body.name} with ${req.body.email} has been succesfully registerd`
        }
        res.status(201).json(registerMessage);
      })
      .catch(error => {
        let errorMessage = {
          error: error.message,
          fullError: error
        }
        res.status(500).json(errorMessage)
      })
  }
}

module.exports = UserController;