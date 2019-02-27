const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {

  static findAllByUser(req, res) {
    Answer
    .find({
      UserId: req.userAuthentic._id
    })
    .sort({createdAt : -1})
    .populate('upVotes')
    .populate('downVote')
    .populate('UserId')
    .populate({path : 'QuestionId', populate : {path : 'UserId'}})
    .then(answers => {
      console.log(answers)
      res.status(200).json({ answers })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }

  static update(req, res) {
    Answer.findOneAndUpdate({
      _id: req.params.id
    },{
      $set: {
        title: req.body.title,
        description: req.body.description
      }
    },{
      new: true
    })
    .then(answer => {
      res.status(200).json({ answer })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })      
    })
  }

  static create(req, res) {
    Answer.create({
      title: req.body.title,
      description: req.body.description,
      upVotes: [],
      downVotes: [],
      UserId: req.userAuthentic._id,
      QuestionId: req.body.questionId
    })
    .then(answer => {
      console.log(answer)
      return Question.findOneAndUpdate({
        _id: req.body.questionId
      }, {
        $push: {
          AnswerId : answer._id
        }
      }, {
        new:  true
      })
      .populate('AnswerId')
    })
    .then(question => {
      res.status(201).json({ question })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }

  static findOne(req, res) {
    Answer
    .findOne({
      _id: req.params.id
    })
    .populate('upVotes')
    .populate('downVote')
    .populate('UserId')
    .populate({path : 'AnswerId', populate : {path : 'UserId'}})
    .then(answer => {
      res.status(200).json({ answer })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }

  static vote (req, res) {
    let oppositeVote = ''
    if(req.params.vote == 'upVotes') {
      oppositeVote = 'downVotes'
    } else {
      oppositeVote = 'upVotes'
    }
    Answer.findOne({
      _id: req.params.id
    })
    .then(answer => {
      if(answer[req.params.vote] && answer[req.params.vote].filter(userId => userId == req.userAuthentic._id).length != 0) {
        return answer.update({
          $pull: {
            [req.params.vote]: req.userAuthentic._id
          }
        })
      } else if(answer[oppositeVote] && answer[oppositeVote].filter(userId => userId == req.userAuthentic._id).length != 0 ) {
        return Answer.update({
          $pull : {
            [oppositeVote]: req.userAuthentic._id
          },
          $push: {
            [req.params.vote]: req.userAuthentic._id
          }
        })
      } else {
        return answer.update({
          $push: {
            [req.params.vote]: req.userAuthentic._id
          }
        })
      }
    })
    .then(answer => {
      res.status(200).json({ answer })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }
}

module.exports = AnswerController