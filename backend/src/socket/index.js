function onConnection(socket){
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })

  socket.on('ping', (data) => {
    socket.emit('pong', `Hello ${socket.id}`, data)
  })
}

module.exports = onConnection
