const formatDate = require('../helpers/formatDate')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    questionId: {type: Schema.Types.ObjectId, ref: 'Question'},
    answer: String,
    upvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
    votes: {
        type: Number,
        default: 0
    },
    stringDate: String,
    stringTime: String,
}, {timestamps: true})

answerSchema.pre('save', function(next) {
    this.stringTime = formatDate(this.createdAt).stringTime
    this.stringDate = formatDate(this.createdAt).stringDate
    next()
})

answerSchema.post('findOneAndUpdate', function(result, next) {
    result.votes = result.upvote.length - result.downvote.length
    result.save()
    next()
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer