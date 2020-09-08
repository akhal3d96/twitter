const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))

// Connect Database
connectDB()

// Initiate middleware asas
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('Up and Running!'))

// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/tweets', require('./routes/api/tweets'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server started on port:', PORT))
