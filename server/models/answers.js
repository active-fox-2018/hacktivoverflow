const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
    title: {
        type: String,
        required: [true, 'title required']
    },
    description: {
        type: String,
        required: [true, 'description required']
    },
    votes: [{ userId: {type: Schema.Types.ObjectId, ref: 'User'}, status: String }],
    updatedAt: {
      type: Date,
      default: new Date
    }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer