import io from 'socket.io-client'
import authHeader from './authHeader'

export default () => {
  console.log(authHeader())

  const socket = io('localhost:3000', {
    extraHeaders: authHeader(),
    autoConnect: false,
  })

  return socket
}
