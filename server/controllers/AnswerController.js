const Answer = require('../models/Answer')
const Question = require('../models/Question')

class AnswerController {
  static create(req, res, next) {
    var newAnswer
    var updatedQuestion

    Answer
      .create({
        description: req.body.description,
        author: req.user._id,
      })
      .then(answer => {
        newAnswer = answer
        return Question
          .findById(req.body.questionId)
      })
      .then(question => {
        updatedQuestion = question
        question.answers.unshift(newAnswer._id)
        question.save()
      })
      .then(() => {
        res
          .status(201)
          .json({
            msg: "create success",
            newAnswer,
            updatedQuestion
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "create fail",
            err
          })
      })
  }

  static findByQuestionId(req, res, next) {
    Answer
      .find({ questionId: req.params.questionId })
      .populate('author')
      .then(answers => {
        res
          .status(200)
          .json({
            msg: "get answers success",
            answers
          })
      })
      .catch(err => {
        res
          .status(404)
          .json({
            msg: "answer not found",
            err
          })
      })
  }

  static edit(req, res, next) {
    Answer
      .findOne({ _id: req.params.id })
      .then(answer => {
        if (answer.author.toString() == req.user._id.toString()) {
          Answer
            .findOneAndUpdate(
              { _id: req.params.id },
              req.body,
              { new: true }
            )
            .then(updatedanswer => {
              res
                .status(200)
                .json({
                  msg: "update success",
                  updatedanswer
                })
            })
        } else {
          res
            .status(401)
            .json({
              msg: "you can't edit answers that aren't yours"
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "update answer fail",
            err
          })
      })
  }

  static upvote(req, res, next) {
    Answer
      .findOne({ _id: req.params.id })
      .then(answer => {
        var isUpvoter = false
        var isDownvoter = false
        var downvoterIndex = 0
        var upvoterIndex = 0

        answer.upvoters.forEach((upvoter, index) => {
          if (upvoter.toString() == req.user._id.toString()) {
            isUpvoter = true
            upvoterIndex = index
          }
        })

        answer.downvoters.forEach((downvoter, index) => {
          if (downvoter.toString() == req.user._id.toString()) {
            isDownvoter = true
            downvoterIndex = index
          }
        })

        if (!isUpvoter) {
          if (isDownvoter) {
            answer.downvoters.splice(downvoterIndex, 1)
          }

          answer.upvoters.push(req.user._id)
          return answer
            .save()
            .then(() => {
              res
                .status(200)
                .json({
                  msg: "upvote success",
                  answer
                })
            })

        } else {
          answer.upvoters.splice(upvoterIndex, 1)
          return answer
            .save()
            .then(() => {
              res
                .status(200)
                .json({
                  msg: "undo upvote success"
                })
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "upvote fail",
            err
          })
      })
  }

  static downvote(req, res, next) {
    Answer
      .findOne({ _id: req.params.id })
      .then(answer => {
        var isDownvoter = false
        var isUpvoter = false
        var upvoterIndex = 0
        var downvoterIndex = 0

        answer.downvoters.forEach((downvoter, index) => {
          if (downvoter.toString() == req.user._id) {
            isDownvoter = true
            downvoterIndex = index
          }
        })

        answer.upvoters.forEach((upvoter, index) => {
          if (upvoter.toString() == req.user._id) {
            isUpvoter = true
            upvoterIndex = index
          }
        })

        if (!isDownvoter) {
          if (isUpvoter) {
            answer.upvoters.splice(upvoterIndex, 1)
          }

          answer.downvoters.push(req.user._id)
          answer
            .save()
            .then(() => {
              res
                .status(200)
                .json({
                  msg: "downvote success",
                  answer
                })
            })


        } else {
          answer.downvoters.splice(downvoterIndex, 1)
          return answer
            .save()
            .then(() => {
              res
                .status(200)
                .json({
                  msg: "undo downvote success"
                })
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "downvote fail",
            err
          })
      })
  }

  static delete(req, res, next) {
    Answer
      .findOne({ _id: req.params.id })
      .then(answer => {
        if (answer.createdBy.toString() == req.user._id.toString()) {
          Answer
            .findOneAndDelete({ _id: req.params.id })
            .then(answer => {
              res
                .status(200)
                .json({
                  msg: "delete success",
                  answer
                })
            })
        } else {
          res
            .status(401)
            .json({
              msg: "you can't delete someone else's answer"
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal serverv error",
            err
          })
      })
  }
}

module.exports = AnswerController