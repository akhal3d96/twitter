const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

module.exports = async function connectDB () {
  try {
    await mongoose.connect(db,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error.message)

    process.exit(1)
  }
}
