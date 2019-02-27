const Question = require('../models/question')
const Answer = require('../models/answer')

class QuestionController {

  static create (req, res) {
    Question.create({
      title: req.body.title,
      description: req.body.description,
      upVotes: [],
      downVotes: [],
      UserId: req.userAuthentic._id,
      AnswerId: [],
      Tags: req.body.tags
    })
    .then(question => {
      res.status(201).json({ question })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }


  static findWhere(req, res) {
    console.log('=====')
    let regex = new RegExp(req.query.search, 'i')
    Question.find({
        $or: [{
            title: {
              $in: [regex]
            }
          },
          {
            Tags: {
              $in: [regex]
            }
          },
          {
            description: {
              $in: [regex]
            }
          },
        ]
      })
      .then(questions => {
        console.log(questions, '=====')
        res.status(200).json(questions)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }


  static getAllTags(req, res) {

  }

  static findOne(req, res) {
    Question
    .findOne({
      _id: req.params.id
    })
    .populate('upVotes')
    .populate('downVote')
    .populate('UserId')
    .populate({path : 'AnswerId', populate : {path : 'UserId'}})
    .then(question => {
      res.status(200).json({ question })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }

  static findByUser(req, res) {
    Question
      .find({
        UserId: req.userAuthentic._id
      })
      .sort({createdAt : -1})
      .populate('upVotes')
      .populate('downVote')
      .populate('UserId')
      .populate({path : 'AnswerId', populate : {path : 'UserId'}})
      .then(questions => {
        res.status(200).json({ questions })
      })
      .catch(err => {
        res.status(500).json({ err : err.message })
      })
  }

  static findAll (req, res) {
   Question
    .find({})
    .sort({createdAt : -1})
    .limit(10)
    .populate('upVotes')
    .populate('downVote')
    .populate('UserId')
    .populate('AnswerId')
    .then(questions => {
      res.status(200).json({ questions })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }

  static update (req, res) {
    Question.findOneAndUpdate({
      _id: req.params.id,
      UserId: req.userAuthentic._id
    }, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        Tags: req.body.tags
      }
    }, {
      new: true,
      runValidators: true
    })
    .then((question) => {
      res.status(200).json({ question })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
    })
  }

  static removeQuestion (req, res) {
    Answer.deleteMany({
      QuestionId : req.params.id
    })
    .then(answer => {
      return Question.findOneAndDelete({
        _id: req.params.id
      })
    })
    .then(question => {
      res.status(200).json({ question })
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
    Question.findOne({
      _id: req.params.id
    })
    .then(question => {
      if(question[req.params.vote] && question[req.params.vote].filter(userId => userId == req.userAuthentic._id).length != 0) {
        return question.update({
          $pull: {
            [req.params.vote]: req.userAuthentic._id
          }
        })
      } else if(question[oppositeVote] && question[oppositeVote].filter(userId => userId == req.userAuthentic._id).length != 0 ) {
        return question.update({
          $pull : {
            [oppositeVote]: req.userAuthentic._id
          },
          $push: {
            [req.params.vote]: req.userAuthentic._id
          }
        })
      } else {
        return question.update({
          $push: {
            [req.params.vote]: req.userAuthentic._id
          }
        })
      }
    })
    .then(question => {
      res.status(200).json({ question })
    })
    .catch(err => {
      res.status(500).json({ err : err.message })
      
    })
  }
}

module.exports = QuestionController