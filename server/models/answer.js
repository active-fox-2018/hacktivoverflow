var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [1, 'answer is required']
  },
  description: {
    type: String,
    required: true,
    minlength: [1, 'answer is required']
  },
  votes: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: Number
    }
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  created_at: {
    type: Date,
    required: true
  }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
