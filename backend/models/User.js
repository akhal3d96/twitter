const mongoose = require('mongoose')

const schema = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}

const UserSchema = new mongoose.Schema(schema)
const User = mongoose.model('user', UserSchema)

module.exports = User
