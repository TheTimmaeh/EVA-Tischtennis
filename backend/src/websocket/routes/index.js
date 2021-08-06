module.exports = (db) => {

  function onConnection(socket){
    console.log(`User ${socket.user.id}/${socket.user.username} connected.`)

    socket.on('disconnect', () => {
      console.log(`User ${socket.user.id}/${socket.user.username} disconnected.`)
    })

    socket.on('ping', (data) => {
      socket.emit('pong', `Hello ${socket.user.username}`, data)
    })

    require('./match.js')(db, socket)
  }

  return onConnection
}
