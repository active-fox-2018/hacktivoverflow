const mongoose = require('mongoose')
const schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const aSchema = new schema({
  description: {
    type: String,
    required: `Details is required`
  },
  upvotes: {
    type: Array
  },
  downvotes: {
    type: Array,
  },
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  questionId: {
    type: ObjectId,
    ref: 'Question'
  }
})

let answer = mongoose.model('Answer', aSchema)

module.exports = answer;