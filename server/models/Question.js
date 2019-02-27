const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, "title can't be empty"]
  }, 
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String, 
  upvoters: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  downvoters: [{
    type: Schema.Types.ObjectId,
    ref: "User" 
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: "Answer"
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: "Tag"
  }]
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question