const Answer = require('../models/Answer')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    createAnswer: (req, res) => {
        // console.log(req.headers)
        let newAnswer = { title, description} = req.body.formEditObj
        newAnswer.userId = req.current_user._id
        newAnswer.questionId = req.body.formEditObj.questionId
        Answer
            .create(newAnswer)
            .then(answer => {
                res.status(201).json(answer)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    findAllAnswers: (req, res) => {
        Answer
            .find({questionId: ObjectId(req.headers.questionid)})
            .then(answers => {
                console.log(answers)
                res.status(200).json(answers)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    findOne: (req, res) => {
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
}