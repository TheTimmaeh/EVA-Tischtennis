import { inject } from 'vue'

export default () => {
  const socket = {
    connected: inject('socketConnected'),
    emit: inject('socketEmit'),
    on: inject('socketOn'),
  }

  return socket
}
