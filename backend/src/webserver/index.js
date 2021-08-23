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

// Receive db, expose app & http
module.exports = (db) => {

  // Routes
  const routes = require('./routes')(db)
  app.use('/', routes)

  return http
}
