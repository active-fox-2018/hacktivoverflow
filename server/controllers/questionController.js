const Question = require('../models/question')

class QuestionController {

  static create(req, res) {
    Question
      .create({
        title: req.body.title,
        description: req.body.description,
        upvotes: [],
        downvotes: [],
        userId: req.decoded.id
      })
      // .populate('User')
      .then(data => {
        res.status(201).json({
          msg: `questions added`,
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
    Question
      .find({})
      .populate('userId')
      .then(allQ => {
        res.json({
          msg: `all Questions`,
          data: allQ
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: err.message
        })
      })
  }
  static findByUserId(req, res) {
    console.log(req.decoded.id)
    Question
      .find({
        userId: req.decoded.id
      })
      .then(allQues => {
        console.log(allQues)
        res.status(200).json({
          msg: `all Questions you created`,
          data: allQues
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: err.message
        })
      })
  }
  static findOne(req, res) {
    // console.log(req.params.id)
    Question
      .findOne({
        _id: req.params.questionId
      })
      .then(q => {
        if (q) {
          res.json({
            msg: `question found`,
            data: q
          })
        } else {
          res.status(404).json({
            msg: `there's no article by that ID`
          })
        }
        console.log(q)
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        })
      })
  }
  static delete(req, res) {
    // console.log(req.params, '=========')
    Question
      .findOne({
        _id: req.params.questionId
      })
      .then(q => {
        if (!q) {
          res.status(404).json({
            msg: `there's no questions by that ID`
          })
        } else if (q.userId == req.decoded.id) {
          return Question
            .deleteOne({
              _id: req.params.questionId
            })
            .then(() => {
              console.log(`delete success`)
              res.json({
                msg: `delete success`
              })
            })
        } else {
          res.status(404).json({
            msg: `you don't have any permission for this action -- delete`
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
  static update(req, res) {
    Question
      .findOne({
        _id: req.params.questionId
      })
      .then(q => {
        console.log(q)
        if (!q) {
          res.status(404).json({
            msg: `there's no questions by that ID`
          })
        } else if (q.userId == req.decoded.id) {
          return Question
            .updateOne({
              _id: req.params.questionId
            }, {
              title: req.body.title,
              description: req.body.description
            })
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
    // console.log(req.body, '----upvotes')
    Question
      .findOne({
        _id: req.params.questionId
      })
      .then(q => {
        console.log(q, '--------')
        if(!q) {
          res.status(404).json({
            msg: `question not found`
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
          } else if(downvoted) {
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
        _id: req.params.questionId
      })
      .then(q => {
        if(!q) {
          res.status(404).json({
            msg: `question not found`
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
          } else if(downvoted) {
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

module.exports = QuestionController
