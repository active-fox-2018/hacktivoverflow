const Answer = require('../models/answer')

class AnswerController {

  static create(req, res) {
    console.log(req.body)
    Answer
      .create({
        description: req.body.description,
        votes: [],
        userId: req.decoded.id,
        questionId: req.body.questionId
      })
      .then(data => {
        res.status(201).json({
          msg: `answer added`,
          data: data
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: err.message
        })
      })
  }
  static read(req, res) {
    Answer
      .find({
        questionId: req.params.questionId
      })
      .populate('User')
      .then(allAns => {
        console.log(allAns)
        res.status(200).json({
          msg: `all answers by the question`,
          data: allAns
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: err.message
        })
      })
  }
  static update(req, res) {
    Answer
      .findOne({
        _id: req.params.answerId
      })
      .then(q => {
        if (!q) {
          res.status(404).json({
            msg: `there's no answer by that ID`
          })
        } else if (q.userId === req.decoded.id) {
          return Question
            .updateOne({
              _id: req.params.answerId
            }, req.body)
            .then((updated) => {
              console.log(`updated success`)
              res.json({
                msg: `updated success`,
                data: updated
              })
            })
        } else {
          res.status(404).json({
            msg: `you don't have any permission for this action -- updated`
          })
        }
      })
      .catch(err => {
        // console.log(err)
        res.status(500).json({
          msg: err.message
        })
      })
  }
  static upvotes(req, res) {
    Answer
      .findOne({
        _id: req.params.answerId
      })
      .then(q => {
        console.log(q, '--------')
        if (!q) {
          res.status(404).json({
            msg: `answer not found`
          })
        } else {
          let upvoted = q.upvotes.find(val => val === req.decoded.id)
          let downvoted = q.downvotes.find(val => val === req.decoded.id)
          console.log(upvoted, '====== voted')
          if (upvoted) { //kalau ada
            q.upvotes.pull(upvoted)
            res.status(200).json({
              msg: `upvote--`,
              data: q
            })
          } else if (downvoted) {
            q.downvotes.pull(downvoted)
            res.status(200).json({
              msg: `downvote--`,
              data: q
            })
          } else {
            q.upvotes.push(req.decoded.id)
            res.status(200).json({
              msg: `upvote success`,
              data: q
            })
          }
          q.save()
        }
      })
      .catch(err => {
        console.log(`errr ----- `, err)
        res.status(500).json({
          msg: err.message
        })
      })
  }
  static downvotes(req, res) {
    Question
      .findOne({
        _id: req.params.answerId
      })
      .then(q => {
        if (!q) {
          res.status(404).json({
            msg: `answer not found`
          })
        } else {
          let upvoted = q.upvotes.find(val => val === req.decoded.id)
          let downvoted = q.downvotes.find(val => val === req.decoded.id)
          console.log(downvoted, '====== voted')
          if (upvoted) { //kalau ada
            q.upvotes.pull(upvoted)
            res.status(200).json({
              msg: `upvote--`,
              data: q
            })
          } else if (downvoted) {
            q.downvotes.pull(downvoted)
            res.status(200).json({
              msg: `downvote--`,
              data: q
            })
          } else {
            q.downvotes.push(req.decoded.id)
            res.status(200).json({
              msg: `downvote++`,
              data: q
            })
          }
          q.save()
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }


}

module.exports = AnswerController