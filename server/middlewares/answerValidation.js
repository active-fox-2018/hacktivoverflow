const Answer = require('../models/Answer')

function answerValidation (req, res, next) {
    Answer
        .findById(req.params.id)
        .then((result) => {
            req.answer = result
            next()
        }).catch((err) => {
            res.status(500).json({msg: 'Internal server error'})
        });
}

module.exports = answerValidation