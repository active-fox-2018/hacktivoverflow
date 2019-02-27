const mongoose = require('mongoose')
const encrypt = require('../helpers/encrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        validate: [{
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
            message : 'Incorrect email format'
        }, {
            isAsync : true,
            validator: function (v, cb) {
                Users.findOne({
                    email : v
                })
                    .then(user =>{
                        if(user && user._id.toString() != this._id.toString()) {
                            cb(false)
                        } else {
                            cb(true)
                        }
                    })
                    .catch(err => {
                        throw err
                    })
            },
            message : 'Email is already been used'
        }]
    },
    password : {
        type : String,
        required : true
    },
    posting : [{type: Schema.Types.ObjectId, ref: 'Posting'}]
})


userSchema.pre('save', function (next) {
    try {
        var user = this;
        if (!user.isModified('password')) return next();
        encrypt(user, function (err, hash) {
            if (err) {
                next(err)
            } else {
                user.password = hash;
                next();
            }
        })
    } catch (err) {
        next(err)
    }

});

const Users = mongoose.model('Users', userSchema)
module.exports = Users
