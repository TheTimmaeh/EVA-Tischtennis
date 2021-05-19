const { authenticateSocket } = require('../helpers/jwt')

// Receive db & http, expose io
module.exports = (db, http) => {
  const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  })

  const routes = require('./routes')(db)

  io.use(authenticateSocket).on('connection', routes)

  return io
}
