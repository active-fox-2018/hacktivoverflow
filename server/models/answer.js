const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const AnswerSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please fill up the Answer's title"]
    },
    description: {
        type: String,
        required: [true, "Please fill up the Answer's Description"]
    },
    upvotes: [{
        type: ObjectId,
        ref: "User"
    }],
    downvotes: [{
        type: ObjectId,
        ref: "User"
    }],
    user: {
        type: ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer