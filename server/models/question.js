const mongoose = require('mongoose')
const schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const qSchema = new schema({
  title: {
    type: String,
    required: `Title is required`
  },
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
})

let question = mongoose.model('Question', qSchema)

module.exports = question;