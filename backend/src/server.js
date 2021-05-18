require('dotenv').config()

// Database
const knex = require('knex')
const schemas = require('./schemas')
//schemas()

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

// Parse JSON Body
app.use(express.json())

// Routes
const routes = require('./routes')
app.use('/', routes)


// Socket.io
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
})
const onConnection = require('./socket')
const { authenticateSocket } = require('./helpers/jwt')
io.use(authenticateSocket).on('connection', onConnection)


// Start webserver
http.listen(3000, () => {
  console.log('listening on *:3000')
})
