const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
    static getAnswer(req, res) {
        Answer
            .find({question: req.params.questionId})
            .sort('-created_at')
            .populate('user')
            .then((answers) => {
                res.status(200).json({answers: answers})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static answerQuestion(req, res) {
        let answer = {
            title: req.body.title,
            description: req.body.description,
            user: req.userStorage.id,
            question: req.params.questionId
        }
        let newAns = {}
        Answer
            .create(answer)
            .then((newAnswer) => {
                newAns = newAnswer
                return Question.findOneAndUpdate({_id:req.params.questionId}, {$push: {answers: newAnswer._id}})
            })
            .then((updatedQuestion) => {
                res.status(201).json({status: "Answer Added", answer: newAns})
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({status: err.errors[Object.keys(err.errors)[0]].message})
            })
    }

    static voteAnswer(req, res) {
        if (Number(req.body.vote) > 0) {
            Answer
                .findOneAndUpdate({_id: req.params.answerId}, {$push: {upvotes: req.userStorage.id}}, {new: true})
                .then((updatedAnswer => {
                    res.status(200).json({updatedAnswer: updatedAnswer, status: "You have successfully voted"})
                }))
                .catch((err) => {
                    res.status(500).json({status: "Internal Server Error"})
                })
        } else {
            Answer
                .findOneAndUpdate({_id: req.params.answerId}, {$push: {upvotes: req.userStorage.id}}, {new: true})
                .then((updatedAnswer => {
                    res.status(200).json({updatedAnswer: updatedAnswer, status: "You have successfully voted"})
                }))
                .catch((err) => {
                    res.status(500).json({status: "Internal Server Error"})
                })
        }

    }

    static editAnswer(req, res) {
        Answer
            .findOneAndUpdate({_id: req.params.answerId}, req.body, {new: true})
            .then((updatedAnswer) => {
                res.status(200).json({updatedAnswer: updatedAnswer})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static deleteAnswer(req, res) {
        Answer
            .deleteOne({_id: req.params.answerId})
            .then(() => {
                return Question.findOne({_id: req.headers.questionid})
            })
            .then((question) => {
                let newAnswerBatch = []
                question.answers.forEach(answer => {
                    if (answer._id != req.params.answerId) {
                        newAnswerBatch.push(answer)
                    }
                })
                return Question.findOneAndUpdate({_id: req.headers.questionid}, {answers: newAnswerBatch})
            })
            .then(() => {
                res.status(200).json({status: "Answer Deleted"})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

}

module.exports = AnswerController