var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Minimum length name is 2']
  },
  email: {
    type: String,
    required: true,
    validate: [{
      validator: function(value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
      }, message: `Input email doesn't valid`
    }, {
      validator: function(value) {
        return User
          .findOne({
            email: value
          })
          .then(user => {
            
            if(user){
              if(user._id === this._id){
                return true
              }
              else {
                return false
              }
            }
            else {
              return true
            }
          })
      }, message: `Email has been taken`
    }]
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User
