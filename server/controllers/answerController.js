const Answers = require('../models/answer')
const Postings = require('../models/postings')


module.exports = {
    create(req, res) {
        let newAnswer = ''
        Answers
            .create({
                description: req.body.description,
                user: req.user
            })
            .then(answer => {
                newAnswer = answer
                newAnswer.user = req.author
                return Postings
                    .findOneAndUpdate({
                        _id: req.body.postingId
                    }, {
                            $push: {
                                answers: [newAnswer._id]
                            }
                        }, { new: true })
                    .then(data => {
                        console.log(req.author);

                        newAnswer.user = req.author
                        // console.log(data);

                        // console.log(newAnswer);
                        console.log(newAnswer.user);


                        res.status(201).json({ data: newAnswer, user: req.author })
                    })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    upVotes(req, res) {
        let action = ''
        if (req.body.process == '$pull') {
            action = {
                '$pull': {
                    [`${req.body.command}`]: req.user
                }
            }
        } else {
            action = {
                '$push': {
                    [`${req.body.command}`]: [req.user]
                }
            }
        }


        Answers
            .findOneAndUpdate({
                _id: req.params.id
            },
                action, { new: true })
            .then(data => {
                return Answers
                    .findOne({
                        _id: data._id
                    })
                    .populate('user')
                    .then(data => {
                        res.status(200).json(data)
                    })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    edit(req, res) {
        Answers
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $set: req.body
                }, { new: true })
            .then(data => {
                console.log(data);

                res.status(201).json({ data: data, user: req.author })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}