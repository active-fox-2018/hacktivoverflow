const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    description : {
        type : String,
        require : true
    },
    user : {type: Schema.Types.ObjectId, ref: 'Users'},
    upvotes : [{type: Schema.Types.ObjectId, ref: 'Users'}],
    downvotes : [{type: Schema.Types.ObjectId, ref: 'Users'}]
})

const Answers = mongoose.model('Answers', answerSchema)
module.exports = Answers