const Question = require('../models/Question')

function questionValidation (req, res, next) {
    Question
        .findById(req.params.id)
        .then((result) => {
            req.question = result
            next()
        }).catch((err) => {
            res.status(500).json({msg: 'Internal server error'})
        });
}

module.exports = questionValidation