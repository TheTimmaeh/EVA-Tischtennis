const express = require('express')
const app = express()
const http = require('http').Server(app)

// Loging
const morgan = require('morgan')
app.use(morgan('tiny'))

// SocketIO
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
})

// JSON Web Token
// const jwt = require('express-jwt')
// app.use(jwt({ secret: 'shhhhhhared-secret'}))

app.get('/', (req, res) => {
  res.json({ success: true })
})

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
