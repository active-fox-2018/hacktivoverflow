const formatDate = require('../helpers/formatDate')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {
        type: String,
        required: [true, 'Question Title Cannot be Empty']
    },
    description: {
        type: String,
        required: [true, 'Question Description Cannot be Empty']
    },
    stringDate: String,
    stringTime: String,
    tags: [],
    upvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
    answerId: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    votes: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

questionSchema.pre('save', function(next) {
    this.stringTime = formatDate(this.createdAt).stringTime
    this.stringDate = formatDate(this.createdAt).stringDate
    next()
})

questionSchema.post('findOneAndUpdate', function(result, next) {
    result.votes = result.upvote.length - result.downvote.length
    result.save()
    next()
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question