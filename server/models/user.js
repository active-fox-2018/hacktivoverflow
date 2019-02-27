const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const Password = require('../helpers/password-encrypt-decrypt')

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Please fill up your Fullname']
    },
    birthday: {
        type: Date
    },
    username: {
        type: String,
        required: [true, 'Please fill up your Username']
    },
    email: {
        type: String,
        unique: [true, "Sorry, Email has been used"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid Email address'],
        required: [true, "Please fill up your Email"]
    },
    password: {
        type: String,
        required: [true, "Please fill up your Password"],
        minlength: [6, "Password should be at least 6 characters"]
    },
    watchedTags: [{
        type: ObjectId,
        ref: "Tag"
    }]
})

UserSchema.pre('save', function() {
    this.password = Password.hashPassword(this.password)
})

const User = mongoose.model('User', UserSchema)

module.exports = User