const mongoose = require('mongoose')
const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: `Username is required`
  },
  email: {
    type: String,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    validate: {
      isAsync: true,
      validator: function(val, cb) {
        user
          .findOne({
          email: val,
          _id: {$ne: this._id}
          })
          .then(data => {
            (data) ? cb(false): cb(true)
          })
          .catch(err => {
            cb(false)
          },
        )
      },
      msg: 'Email is already in use!'
    }

  },
  password: {
    type: String,
    required: `Password is required`
  }
})

const user = mongoose.model('User', userSchema)

module.exports = user;