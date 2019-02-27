const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  title: String,
  description: String,
  upVotes: [{ type : Schema.Types.ObjectId, ref : 'User'}],
  downVotes: [{ type : Schema.Types.ObjectId, ref : 'User'}],
  UserId: { type : Schema.Types.ObjectId, ref : 'User'},
  QuestionId: [{ type : Schema.Types.ObjectId, ref : 'Question'}],
  createdAt: { type: Date, default: Date.now }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer