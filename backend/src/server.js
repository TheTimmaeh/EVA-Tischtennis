require('dotenv').config()
const { generateToken, authenticateToken, authenticateSocket } = require('./jwt')

// Webserver
const express = require('express')
const app = express()
const http = require('http').Server(app)

// Logging
const morgan = require('morgan')
app.use(morgan('tiny'))

// Cors
const cors = require('cors')
app.use(cors())

// SocketIO
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
})

// Users
const users = require('./users')

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ success: true })
})

app.post('/login', (req, res) => {
  let { username, password } = req.body

  let user = users.find((u) => u.username === username && u.password === password)

  if(!user) res.json({ success: false, message: 'User not found.' })
  else {
    let token = generateToken({ username: user.username, isAdmin: user.isAdmin })
    res.json({ success: true, user: { username: user.username, isAdmin: user.isAdmin, token }})
  }
})

app.post('/authenticate', authenticateToken, (req, res) => {
  if(req.user) res.json({ success: true, user: req.user })
  else res.json({ success: false, message: 'Could not validate token.' })
})

app.get('/test', authenticateToken, (req, res) => {
  res.json({ user: req.user, body: req.body })
})

io.use(authenticateSocket).on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
