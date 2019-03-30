const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
        name : String
})

const Tags = mongoose.model('Tags', tagSchema)
module.exports = Tags