const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    upvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
    questionId: {type: Schema.Types.ObjectId, ref: 'Question'}
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer