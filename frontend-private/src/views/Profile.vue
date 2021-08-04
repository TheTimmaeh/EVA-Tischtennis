<template>
  <Page>
    <div class="profile">
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
  </Page>
</template>

<script>
  import { computed, onUnmounted } from 'vue'
  import { useStore } from 'vuex'
  import { setTitle, useSocket } from '@/helper'
  import Page from '@/components/Page'

  export default {
    components: {
    Page,
    },
    setup(){
      setTitle('Profil')
      const store = useStore()
      const socket = useSocket()

      socket.on('pong', (...data) => {
        console.log(...data)
      })

      const test = () => {
        socket.emit('ping', { ts: new Date() })
      }

      onUnmounted(() => {
        socket.off('pong')
      })

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
    padding-top: 20px;
    display: inline-block;

    td {
      padding: 5px 3px;
      text-align: left;
    }
  }
</style>
