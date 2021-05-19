require('dotenv').config()

// Database
const db = require('./db')

// Webserver
const { app, http } = require('./webserver')(db)

// Websocket
const io = require('./websocket')(db, http)


// Start webserver
http.listen(3000, () => {
  console.log('listening on *:3000')
})
