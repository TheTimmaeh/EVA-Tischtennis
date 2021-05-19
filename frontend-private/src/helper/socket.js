import { inject } from 'vue'

export default () => {
  const socket = {
    connected: inject('socketConnected'),
    emit: inject('socketEmit'),
    on: inject('socketOn'),
    once: inject('socketOnce'),
    off: inject('socketOff'),
    removeAllListeners: inject('socketRemoveAll'),
    onAny: inject('socketOnAny'),
    prependAny: inject('socketPrependAny'),
    offAny: inject('socketOffAny'),
  }

  return socket
}
