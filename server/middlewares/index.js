const { verify } = require('../helpers')
const { User, Question, Answer, Tag } = require('../models')

module.exports = {
  isLogin(req, res, next) {
    try {
      let decoded = verify(req.headers.token)
      User
        .findOne({email: decoded.email})
        .then(user => {
          if (user) {
            req.user = user
            next()
          } else {
            res.status(400).json({
              msg: 'user not found'
            })
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            msg: 'internal server err',
            err: err
          })
        })
    } catch(err) {
      console.log(err);
      res.status(500).json({
        msg: 'internal server err',
        err: err
      })
    }
  },
  checkQuestionOwner(req, res, next) {
    Question
      .findById(req.params.questionId)
      .then(question => {
        if (question.userId.equals(req.user._id)) {
          next()
        } else {
          res.status(400).json({
            msg: 'this is not youre question'
          })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          msg: 'internal server err',
          err: err
        })
      })
  },
  checkAnswerOwner(req, res, next) {
    Answer
      .findById(req.params.answerId)
      .then(answer => {
        if (answer.userId.equals(req.user._id)) {
          next()
        } else {
          res.status(400).json({
            msg: 'this is not youre answer'
          })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          msg: 'internal server err',
          err: err
        })
      })
  },
  checkTags(req, res, next) {
    if (req.body.tags) {
      Tag
        .find()
        .then(tags => {
          tags = tags.map(tag => tag.text)
          const newTagsPromises = []
          req.body.tags.forEach(tag => {
            if (tags.indexOf(tag) === -1) {
              newTagsPromises.push(Tag.create({text: tag}))
            }
          });
          return Promise.all(newTagsPromises)
        })
        .then(responses => {
          next()
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            msg: 'internal server err',
            err: err
          })
        })
    } else {
      next()
    }
  }
}