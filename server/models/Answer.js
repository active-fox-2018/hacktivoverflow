const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  description: {
    type: String,
    required: [true, "description can't be empty"]
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  upvoters: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  downvoters: [{
    type: Schema.Types.ObjectId,
    ref: "User" 
  }]
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer