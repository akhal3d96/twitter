const mongoose = require('mongoose')

const schema = {
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  location: {
    type: String
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  birthday: {
    type: Date
  }
}

const ProfileSchema = new mongoose.Schema(schema)
const Profile = mongoose.model('profile', ProfileSchema)

module.exports = Profile
