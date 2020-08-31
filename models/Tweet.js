const mongoose = require('mongoose')

const schema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: true
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  replies: [{
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tweet'
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
}

const TweetSchema = new mongoose.Schema(schema)
const Tweet = mongoose.model('tweet', TweetSchema)

module.exports = Tweet
