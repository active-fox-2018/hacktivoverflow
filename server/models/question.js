var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [1, 'question is required']
  },
  description: {
    type: String,
    required: true,
    minlength: [1, 'question is required']
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
  created_at: {
    type: Date,
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
