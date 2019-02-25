const Question = require('../models/Question')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    createQuestion: (req, res, next) => {
        let newQuestion = { title, description, tags } = req.body
        newQuestion.userId = req.current_user._id
        Question
            .create(newQuestion)
            .then(question => {
                res.status(201).json(question)
            })
            .catch(err => {
                req.error = {question: err}
                next()
            })
    },
    findAllQuestion: (req, res) => {
        Question
            .find({})
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({msg: 'internal server error'})
            })
    },
    findOne: (req, res) => {
        Question
            .findById(req.params.id)
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({msg: 'internal server error'})
            })
    },
    updateQuestion: (req, res) => {
        Question
            .findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body.option, {new: true})
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    deleteQuestion: (req, res) => {
        Question
            .findByIdAndDelete(req.params.id)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({msg: 'internal server error'})
            })
    }
}