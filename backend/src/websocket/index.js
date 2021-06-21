module.exports = (db, http) => {
  const { authenticateSocket } = require('../helpers/jwt')(db)

  const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  })

  const routes = require('./routes')(db)

  io.use(authenticateSocket).on('connection', routes)

  return io
}
