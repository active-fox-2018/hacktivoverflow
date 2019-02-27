const Answer = require('../models/Answer')
const Question = require('../models/Question')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    createAnswer: (req, res) => {
        console.log(req.body)
        let answerId = ''
        let newAnswer = { answer } = req.body
        newAnswer.userId = req.current_user._id
        newAnswer.questionId = req.params.questionId
        Answer
            .create(newAnswer)
            .then(answer => {
                answerId = answer._id
                return Question.findById(req.params.questionId)
            })
            .then(question => {
                question.answerId.push(answerId)
                return question.save()
            })
            .then(updated => {
                console.log(updated)
                return updated.populate('answerId').execPopulate()
            })
            .then(populated => {
                res.status(201).json(populated)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err.message)
            })
    },
    findOneAnswer: (req, res) => {
        Answer
            .findById(req.params.id)
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    updateAnswer: (req, res) => {
        Answer
            .findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body.option, {new: true})
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    upvoteAnswer: (req, res) => {
        Answer
            .findOneAndUpdate({_id: ObjectId(req.params.id)}, {$set: {upvote: req.upvote, downvote: req.downvote}}, {new: true})
            .then((result) => {
                // console.log(result, '============')
                res.status(200).json(result)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({msg: 'internal server error'})
            });
    },
    downvoteAnswer: (req, res) => {
        Answer
            .findOneAndUpdate({_id: ObjectId(req.params.id)}, {$set: {downvote: req.downvote, upvote: req.upvote,}}, {new: true})
            .then((result) => {
                // console.log(result)
                res.status(200).json(result)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({msg: 'internal server error'})
            });
    }
}