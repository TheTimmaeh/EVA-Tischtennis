import io from 'socket.io-client'
import authHeader from './authHeader'

export default () => {
  const socket = io('localhost:3000', {
    extraHeaders: authHeader()
  })

  return socket
}
