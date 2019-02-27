module.exports = {
    upvote (req, res, next) {
        console.log(req.question)
        let downvote = req.question.downvote.findIndex(el => {
            return String(el) == String(req.current_user._id)
        })
        if(downvote >= 0) {
            req.question.downvote.pull(req.current_user._id)
        }

        let upvote = req.question.upvote.findIndex(el => {
            return String(el) == String(req.current_user._id)
        })
        if(upvote >= 0) {
            req.question.upvote.pull(req.current_user._id)

        } else {
            req.question.upvote.push(req.current_user._id)
        }
        req.downvote = req.question.downvote
        req.upvote = req.question.upvote
        next()
    },
    downvote (req, res, next) {
        let upvote = req.question.upvote.findIndex(el => {
            return String(el) == String(req.current_user._id)
        })
        if(upvote >= 0) {
            req.question.upvote.pull(req.current_user._id)
        }

        let downvote = req.question.downvote.findIndex(el => {
            return String(el) == String(req.current_user._id)
        })
        if(downvote >= 0) {
            req.question.downvote.pull(req.current_user._id)

        } else {
            req.question.downvote.push(req.current_user._id)
        }
        req.upvote = req.question.upvote
        req.downvote = req.question.downvote
        next()
    }
}