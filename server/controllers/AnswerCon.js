const Answer = require('../models/Answer')
const ObjId = require('mongoose').Types.ObjectId
const Question = require('../models/Question')

class Controller {
    static read (req, res) {
        Answer.find({ question: req.currentQuestion._id }).populate('user').populate('question').populate('upvotes').populate('downvotes').exec()
            .then(data => {
                res.status(200).json(
                    data
                )
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static create (req, res) {
        if (!req.body.title || !req.body.description) {
            res.status(400).json({
                msg: `Title and description must be filled`
            })
        } else {
            let answer = {
                user: req.currentUser._id,
                question: req.currentQuestion._id,
                title: req.body.title,
                description: req.body.description,
                upvotes: [],
                downvotes: [] 
            }

            Answer.create(answer)
                .then(created => {
                    return created.populate('user').populate('question').populate('upvotes').populate('downvotes').execPopulate()
                })
                .then(data => {
                    res.status(201).json(
                        data
                    )
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
    }

    static update (req, res) {
        if (!req.body.title || !req.body.description) {
            res.status(400).json({
                msg: `Title and description must be filled`
            })
        } else {
            let title = req.body.title
            let description = req.body.description
            let answer = {
                title,
                description,
            }
            Answer.findOneAndUpdate({ _id: ObjId(req.currentAnswer._id) }, { $set: answer }, { new: true })
                .then(data => {
                    res.status(200).json(
                        data
                    )
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
    }

    static findOne (req, res) {
        res.status(200).json(req.currentAnswer)
    }

    static upvotes (req, res) {
        let checkUp = req.currentAnswer.upvotes.map(function (e) { return String(e._id) }).indexOf(String(req.currentUser._id))
        let checkDown = req.currentAnswer.downvotes.map(function (e) { return String(e._id) }).indexOf(String(req.currentUser._id))
        if (checkUp == -1) {
            if (checkDown !== -1) {
                req.currentAnswer.downvotes.splice(checkDown, 1)
            } 
            req.currentAnswer.upvotes.push(ObjId(req.currentUser._id))
        } else {
            req.currentAnswer.upvotes.splice(checkUp, 1)
        }

        req.currentAnswer.save()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.messsage
                })
            })
    }

    static downvotes (req, res) {
        let checkUp = req.currentAnswer.upvotes.map(function (e) { return String(e._id) }).indexOf(String(req.currentUser._id))
        let checkDown = req.currentAnswer.downvotes.map(function (e) { return String(e._id) }).indexOf(String(req.currentUser._id))
        if (checkDown == -1) {
            if (checkUp !== -1) {
                req.currentAnswer.upvotes.splice(checkUp, 1)
            } 
            req.currentAnswer.downvotes.push(ObjId(req.currentUser._id))
        } else {
            req.currentAnswer.downvotes.splice(checkDown, 1)
        }

        req.currentAnswer.save()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.messsage
                })
            })
    }

    static delete (req, res) {
        req.currentAnswer.remove()
            .then(data=> {
                return Question.findOneAndUpdate({ _id: ObjId(req.currentAnswer.question)}, { $pull: { answer: ObjId(req.currentAnswer._id) } })
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}

module.exports = Controller