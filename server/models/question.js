const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: String,
  description: String,
  upVotes: [{ type : Schema.Types.ObjectId, ref : 'User'}],
  downVotes: [{ type : Schema.Types.ObjectId, ref : 'User'}],
  UserId: { type : Schema.Types.ObjectId, ref : 'User'},
  AnswerId: [{ type : Schema.Types.ObjectId, ref : 'Answer'}],
  Tags: [{ type : Schema.Types.String }],
  createdAt: { type: Date, default: Date.now }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question