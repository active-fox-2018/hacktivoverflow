module.exports = {
    upvote (req, res, next) {
        console.log(req.answer)
        let downvote = req.answer.downvote.findIndex(el => {
            return String(el) == String(req.current_user._id)
        })
        if(downvote >= 0) {
            req.answer.downvote.pull(req.current_user._id)
        }

        let upvote = req.answer.upvote.findIndex(el => {
            return String(el) == String(req.current_user._id)
        })
        if(upvote >= 0) {
            req.answer.upvote.pull(req.current_user._id)

        } else {
            req.answer.upvote.push(req.current_user._id)
        }
        req.downvote = req.answer.downvote
        req.upvote = req.answer.upvote
        next()
    },
    downvote (req, res, next) {
        let upvote = req.answer.upvote.findIndex(el => {
            return String(el) == String(req.current_user._id)
        })
        if(upvote >= 0) {
            req.answer.upvote.pull(req.current_user._id)
        }

        let downvote = req.answer.downvote.findIndex(el => {
            return String(el) == String(req.current_user._id)
        })
        if(downvote >= 0) {
            req.answer.downvote.pull(req.current_user._id)

        } else {
            req.answer.downvote.push(req.current_user._id)
        }
        req.upvote = req.answer.upvote
        req.downvote = req.answer.downvote
        next()
    }
}