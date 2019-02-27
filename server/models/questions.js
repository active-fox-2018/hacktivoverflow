const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: [true, 'title required']
    },
    description: {
        type: String,
        required: [true, 'description required']
    },
    votes: [{ userId: {type: Schema.Types.ObjectId, ref: 'User'}, status: String }],
    answers: [{ answerId: {type: Schema.Types.ObjectId, ref: 'Answer'} }],
    tags: [],
    updatedAt: {
      type: Date
    }
})

questionSchema.pre('save', function(next) {
    this.updatedAt = new Date
    next()
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question