const Question = require('../models/Question')
const Answer = require('../models/Answer')
const ObjId = require('mongoose').Types.ObjectId

class Controller {
    static read (req, res) {
        Question.find({}).populate('user').populate('upvotes').populate('downvotes').exec()
            .then(data =>{
                res.status(200).json(
                    data
                )
            })
            .catch(err =>{
                res.status(500).json({
                    msg: err.messsage
                })
            })
    }

    static findOne (req, res) {
        res.status(200).json(req.currentQuestion)
    }

    static create (req, res) {
        if (!req.body.title || !req.body.description) {
            res.status(400).json({
                msg: `Title and description must be filled`
            })
        } else {
            // let tags = req.body.tags

            let question = {
                user: req.currentUser._id,
                title: req.body.title,
                description: req.body.description,
                upvotes: [],
                downvotes: [],
                tags: req.body.tags
            }

            Question.create(question)
                .then(data => {
                    return data.populate('user').populate('upvotes').populate('downvotes').execPopulate()
                })
                .then(populated => {
                    res.status(201).json(populated)
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.messsage
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
            let tags = req.body.tags
            let title = req.body.title
            let description = req.body.description

            // if (String(req.currentQuestion.user._id) !== String(req.currentUser._id)) {
            //     title = req.currentQuestion.title
            //     description = req.currentQuestion.description
            //     tags = req.currentQuestion.tags
            // }

            let question = {
                title,
                description,
                // upvotes: req.body.upvotes,
                // downvotes: req.body.downvotes,
                tags
            }
            req.currentQuestion.set(question)
            req.currentQuestion.save()
                .then(data => {
                    res.status(200).json({
                        msg: `Success update`,
                        data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.messsage
                    })
                })
        }
    }

    static upvotes (req, res) {
        let checkUp = req.currentQuestion.upvotes.map(function (e) { return String(e._id) }).indexOf(String(req.currentUser._id))
        let checkDown = req.currentQuestion.downvotes.map(function (e) { return String(e._id) }).indexOf(String(req.currentUser._id))
        if (checkUp == -1) {
            if (checkDown !== -1) {
                req.currentQuestion.downvotes.splice(checkDown, 1)
            } 
            req.currentQuestion.upvotes.push(ObjId(req.currentUser._id))
        } else {
            req.currentQuestion.upvotes.splice(checkUp, 1)
        }

        req.currentQuestion.save()
            .then(notPop => {
                return notPop.populate('answer').populate('user').execPopulate()
            })
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
        let checkUp = req.currentQuestion.upvotes.map(function (e) { return String(e._id) }).indexOf(String(req.currentUser._id))
        let checkDown = req.currentQuestion.downvotes.map(function (e) { return String(e._id) }).indexOf(String(req.currentUser._id))

        if (checkDown == -1) {
            if (checkUp !== -1) {
                req.currentQuestion.upvotes.splice(checkUp, 1)
            } 
            req.currentQuestion.downvotes.push(ObjId(req.currentUser._id))
        } else {
            req.currentQuestion.downvotes.splice(checkDown, 1)
        }

        req.currentQuestion.save()
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
        req.currentQuestion.remove()
            .then(resp => {
                Answer.deleteMany({ question: ObjId(req.currentQuestion._id) }, (err) => {
                    if(err) {
                        console.log(err)
                    } else {
                        res.status(200).json({
                            msg: `Success delete`
                        })
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
       

    }
}
module.exports = Controller