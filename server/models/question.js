const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const QuestionSchema = new Schema ({
    title: {
        type: String,
        required: [true, "Please fill up the Question's title"]
    },
    description: {
        type: String,
        required: [true, "Please fill up the Question's Description"]
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
    tags: [{
        type: String,
        ref: "Tag"
    }],
    answers: [{
        type: ObjectId,
        ref: "Answer",
        default: []
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question