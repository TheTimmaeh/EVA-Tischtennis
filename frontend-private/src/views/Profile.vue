<template>
  <div>
    <table>
      <tr>
        <td>Username:</td>
        <td>{{ username }}</td>
      </tr>
      <tr>
        <td>isAdmin:</td>
        <td>{{ isAdmin }}</td>
      </tr>
      <tr>
        <td>Socket:</td>
        <td>{{ connected ? 'Connected' : 'Disconnected' }}</td>
      </tr>
    </table>
    <button @click="test()">Test Connection</button>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useSocket } from '@/helper'

  export default {
    setup(){
      const store = useStore()
      const socket = useSocket()

      socket.on('pong', (...data) => {
        console.log(...data)
      })

      let test = () => {
        socket.emit('ping', { ts: new Date() })
      }

      return {
        username: computed(() => store.state.user.username),
        isAdmin: computed(() => store.state.user.isAdmin),
        connected: socket.connected,
        test,
      }
    }
  }
</script>

<style lang="scss">
  table {
    display: inline-block;

    td {
      padding: 5px 3px;
      text-align: left;
    }
  }
</style>
