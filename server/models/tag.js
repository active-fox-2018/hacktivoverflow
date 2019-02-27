const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const TagSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Please fill up Tag Name']
    },
    questions: [{
        type: ObjectId,
        ref: 'Question'
    }]
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag
