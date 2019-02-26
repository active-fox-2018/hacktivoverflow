const { Answer, Question } = require('../models')

module.exports = {
    create(req, res) {
        let { title, description } = req.body
        let newAnswer = {
          userId: req.user._id,
          questionId: req.params.questionId,
          title,
          description
        }
        Answer
            .create(newAnswer)
            .then(answer => {
                return Question.findOneAndUpdate({_id: req.params.questionId}, { $push: {answers: {answerId: answer._id}} }, { new: true })
            })
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
    update(req, res) {
        let { title, description } = req.body
        let newAnswer = {
            title,
            description
        }
        Answer
            .findByIdAndUpdate(req.params.answerId, newAnswer, {new: true})
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    err: err
                })
            })
    },
    delete(req, res) {
        Answer
            .findByIdAndDelete(req.params.answerId)
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal server error",
                    err: err
                })
            })
    },
    votes(req, res) {
        Answer
            .findById(req.params.answerId)
            .then(answer => {
                let vote = {userId: req.user._id, status: req.body.status}
                if (answer.votes.length > 0) {
                    let index = answer.votes.findIndex(function(voter) {
                        return voter.userId.toString() === req.user._id.toString()
                    })
                    if (index === -1) {
                        answer.votes.push(vote)
                    } else {
                        if (answer.votes[index].status === vote.status) {
                            answer.votes.splice(index, 1)
                        } else {
                          answer.votes[index] = vote
                        }
                    }
                } else {
                    answer.votes.push(vote)
                }
                answer.save()
                res.status(200).json({votes: answer.votes})
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