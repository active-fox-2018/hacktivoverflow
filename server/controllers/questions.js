const { Question } = require('../models')

module.exports = {
    create(req, res) {
        let { title, description } = req.body
        let newQuestion = {
          userId: req.user._id,
          tags: req.body.tags,
          title,
          description
        }
        Question
            .create(newQuestion)
            .then(question => {
                res.status(201).json(question)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    err: err
                })
            })
    },
    getOne(req, res) {
        Question
            .findById(req.params.questionId)
            .populate('userId')
            .populate('answers.answerId')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    err: err
                })
            })
    },
    getAll(req, res) {
        Question
            .find()
            .populate('userId')
            .populate('answers.answerId')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    err: err
                })
            })
    },
    update(req, res) {
        let { title, description } = req.body
        let newQuestion = {
            title: title,
            description: description,
            tags: req.body.tags
        }
        Question
            .findByIdAndUpdate(req.params.questionId, newQuestion, { new: true })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    err: err
                })
            })
    },
    delete(req, res) {
        Question
            .findByIdAndDelete(req.params.questionId)
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    err: err
                })
            })
    },
    votes(req, res) {
        Question
            .findById(req.params.questionId)
            .then(question => {
                let vote = {userId: req.user._id, status: req.body.status}
                if (question.votes.length > 0) {
                    let index = question.votes.findIndex(function(voter) {
                        return voter.userId.toString() === req.user._id.toString()
                    })
                    if (index === -1) {
                        question.votes.push(vote)
                    } else {
                        if (question.votes[index].status === vote.status) {
                            question.votes.splice(index, 1)
                        } else {
                            question.votes[index] = vote
                        }
                    }
                } else {
                    question.votes.push(vote)
                }
                question.save()
                res.status(200).json({votes: question.votes})
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Internal server error",
                    err: err
                })
            })
    }
}