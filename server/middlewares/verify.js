const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer');
const jsonwebtoken = require('../helpers/jsonwebtoken');

module.exports = {
  authentication(req, res, next) {
    if(!req.headers.token){
      let errorMessage = {
        error: `please login first`
      }
      res.status(400).json(errorMessage)
    }
    else{
      let user = jsonwebtoken.verify(req.headers.token);
      User
        .find({
          _id: user._id,
          name: user.name,
          passwrod: user.password
        })
        .then(user => {
          if(user){
            next();
          }
          else {
            let errorMessage = {error: `invalid token error`}
            res.status(400).json(errorMessage);
          }
        })
    }
  },

  authorizationAnswer(req, res, next) {
    let user = jsonwebtoken.verify(req.headers.token);
    Answer
      .find({
        _id: req.params.id
      })
      .then(answer => {
        if(!answer) {
          let errorMessage = {
            error: `you didn't authorizated to use this feature`
          }
          res.status(400).json(errorMessage);
        }
        if(answer[0].userId.toString() === user._id.toString()){
          next();
        }
        else {
          let errorMessage = {
            error: `you didn't authorizated to use this feature`
          }
          res.status(400).json(errorMessage);
        }
      })
  },

  authorizationQuestion(req, res, next) {
    let user = jsonwebtoken.verify(req.headers.token);
    Question
      .find({
        _id: req.params.id
      })
      .then(question => {
        if(!question) {
          let errorMessage = {
            error: `you didn't authorizated to use this feature`
          }
          res.status(400).json(errorMessage);
        }
        if(question[0].userId.toString() === user._id.toString()){
          next();
        }
        else {
          let errorMessage = {
            error: `you didn't authorizated to use this feature`
          }
          res.status(400).json(errorMessage);
        }
      })
  }
}