const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postingSchema = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'Users'},
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    upvotes : [{type: Schema.Types.ObjectId, ref: 'Users'}],
    downvotes : [{type: Schema.Types.ObjectId, ref: 'Users'}],
    answers : [{type: Schema.Types.ObjectId, ref: 'Answers'}],
    tags : [{type: Schema.Types.ObjectId, ref: 'Tags'}]
})

const Posting = mongoose.model('Posting', postingSchema)
module.exports = Posting