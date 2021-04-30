<template>
  <div class="socket">
    <h1>Socket Status: {{ statusses[status] }}</h1>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  import { ref, onMounted } from 'vue'

  export default {
    setup(){
      const statusses = ['Disconnected', 'Connected', 'Reconnected']
      const status = ref(-1)

      const socket = io('localhost:3000')

      const initSocket = () => {
        socket.on('reconnect', () => {
          console.log('Reconnect')
          status.value = 2
        })

        socket.on('connect', () => {
          console.log('Connect')
          status.value = 1
        })

        socket.on('disconnect', () => {
          console.log('Disconnect')
          status.value = 0
        })

        socket.on('message', (data) => {
          console.log('Message', data)
        })
      }

      onMounted(initSocket)

      return {
        statusses,
        status,
        socket,
      }
    },
  }
</script>
