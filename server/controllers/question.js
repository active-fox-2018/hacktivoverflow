const Question = require('../models/question')
const Tag = require('../models/tag')

class QuestionController {
    static getAQuestion(req, res) {
        Question
            .findOne({_id: req.params.questionId})
            .populate('answers')
            .then((question) => {
                res.status(200).json({question})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static topQuestion(req, res) {
        Question
            .find({})
            .populate('user')
            .populate('tag')
            .populate('answers')
            .sort('-upvotes')
            .limit(10)
            .then((questions) => {
                res.status(200).json({questions})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static newQuestion(req, res) {
        let question = {
            title: req.body.title,
            description: req.body.description,
            user: req.userStorage.id,
            tags: req.body.tags
        }

        let theQuestion = null

        Question
            .create(question)
            .then((newQuestion) => {

                theQuestion =  newQuestion
                if (question.tags.length > 0) {
                    let tagAdd = question.tags.forEach((tag) => {
                        return new Promise((resolve, reject) => {
                            Tag
                            .findOne({name: tag})
                            .then((tagFound) => {
                                if (!tagFound) {
                                    Tag.create({name: tag, questions: [theQuestion._id]})
                                        .then((question) => {
                                            resolve(question)
                                        })
                                        .catch((err) => {
                                            reject(err)
                                        })
                                } else {
                                    Tag.updateOne({_id: tagFound._id}, {$push:{questions: theQuestion._id}}, {new:true })
                                        .then((question) => {
                                            resolve(question)
                                        })
                                        .catch((err) => {
                                            reject(err)
                                        })
                                }
                            })
                            .catch((err) => {
                                reject(err)
                            })
                        }) 
                        
                    })

                    return tagAdd
                } else {
                    res.status(201).json({theQuestion, status: "You have successfully asked a question"})
                } 
            })
            .then(() => {
                res.status(201).json({theQuestion, status: "You have successfully asked a question"})

            })
            .catch((err) => {
                res.status(400).json({status: err.errors[Object.keys(err.errors)[0]].message})
            })
    }

    static getQuestions(req, res) {
        Question
            .find({})
            .populate('user')
            .populate('tag')
            .populate('answers')
            .sort('-created_at')
            .then((questions) => {
                res.status(200).json({questions})
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static voteQuestion(req, res) {
        if (Number(req.body.vote) > 0) {
            Question
                .findOneAndUpdate({_id: req.params.questionId}, {$push: {upvotes: req.userStorage.id}}, {new: true})
                .then((updatedQuestion => {
                    res.status(200).json({updatedQuestion: updatedQuestion, status: "You have successfully voted"})
                }))
                .catch((err) => {
                    res.status(500).json({status: "Internal Server Error"})
                })
        } else {
            Question
                .findOneAndUpdate({_id: req.params.questionId}, {$push: {upvotes: req.userStorage.id}}, {new: true})
                .then((updatedQuestion => {
                    res.status(200).json({updatedQuestion: updatedQuestion, status: "You have successfully voted"})
                }))
                .catch((err) => {
                    res.status(500).json({status: "Internal Server Error"})
                })
        }
    }

    static editQuestion(req, res) {
        Question
            .findOneAndUpdate({_id: req.params.questionId}, req.body, {new: true})
            .then((updatedQuestion) => {
                res.status(200).json({updatedQuestion: updatedQuestion})
            }) 
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static deleteQuestion(req, res) {
        Question
            .findOneAndDelete({_id: req.params.questionId})
            .then(() => {
               res.status(200).json({status: "Question deleted"}) 
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }

    static addTags(req, res) {
        
    }
}

module.exports = QuestionController