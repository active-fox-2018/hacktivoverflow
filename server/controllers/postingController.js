const Postings = require('../models/postings')

module.exports = {
    create(req, res) {
        console.log(req.tags,"==========inside controller");
        
        Postings
            .create({
                title: req.body.title,
                description: req.body.description,
                user: req.user,
                tags: req.tags.map(e => e._id)
            })
            .then(posting => {
               return Postings
                    .findById(posting._id)
                    .populate('tags')
                    .populate('user')
                    .then(data => {
                        console.log(data);
                        
                        res.status(201).json(data)
                    })
            })
            .catch(err => {
                console.log(err);        
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
            .populate('tags')
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