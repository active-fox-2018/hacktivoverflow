const Tag = require('../models/tag')

class TagController {
    static getTags(req, res) {
        Tag
            .findOne({name: req.params.name})
            .populate('questions')
            .populate({path: 'questions', populate: {path: 'user', model:'User'}})
            .then((tag) => {
                res.status(200).json(tag)
            })
            .catch((err) => {
                res.status(500).json({status: "Internal Server Error"})
            })
    }
}

module.exports = TagController