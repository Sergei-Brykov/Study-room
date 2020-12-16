const { Schema, model } = require('mongoose')


// const { hashPassword } = require('../utils/hashPassword')
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default:''
  },
  role: {
    type: String,
    default:'user'
  },
  avatar: {
    type: String
  },
  name: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  }
})
// userSchema.pre('save', function (next) {
//   this.password = hashPassword(this.password);
//   next();
// });



module.exports = model('User', userSchema)