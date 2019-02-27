const Postings = require('../models/postings')

module.exports = {
    create(req, res) {
        Postings
            .create({
                title: req.body.title,
                description: req.body.description,
                user: req.user
            })
            .then(posting => {
                res.status(201).json(posting)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    getAll(req, res) {
       
        Postings
            .find({})
            .populate('user')
            .populate({
                path: 'answers', 
                populate: {
                    path: 'user'
                }
            })
            .then(postings => {
                res.status(200).json(postings)
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
        Postings
            .findOneAndUpdate({
                _id: req.params.id
            },
                action, { new: true })
            .then(data => {
                console.log(data, "================");

                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    update(req,res) {
        Postings
            .findOneAndUpdate({
                _id : req.params.id
            }, {
                $set : req.body
            }, {new : true})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    delete(req,res) {
        Postings
            .findOneAndDelete({
                _id : req.params.id
            })
            .then(()=> {
                res.status(200).json({message : 'posting deleted'})
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }


}