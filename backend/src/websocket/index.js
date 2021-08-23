module.exports = (db, http) => {
  const { optionalAuthenticateSocket } = require('../helpers/jwt')(db)

  const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  })

  const routes = require('./routes')(db)

  io.use(optionalAuthenticateSocket).on('connection', routes)

  return io
}
