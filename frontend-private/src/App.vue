<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/components">Components</router-link> |
      <template v-if="loggedIn">
        <router-link to="/users">Users</router-link> |
        <router-link to="/persons">Personen</router-link> |
        <router-link to="/associations">Vereine</router-link> |
        <router-link to="/seasons">Saisons</router-link> |
        <router-link to="/playerClasses">Spielerklassen</router-link> |

        <router-link to="/competitions">Turniere</router-link> |
        <router-link to="/match">Aktuelles Match</router-link> |
        <router-link to="/profile">Profil</router-link> |
        <router-link to="/logout">Logout</router-link>
      </template>
      <router-link to="/login" v-else>Login</router-link> |
      Socket: {{ connected ? 'Connected' : 'Disconnected' }}
    </div>
    <div id="page">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import { ref, computed, watch, provide } from 'vue'
  import { useStore } from 'vuex'
  import { io } from '@/helper'

  export default {
    setup(){
      const store = useStore()

      let loggedIn = computed(() => !!store.state.user && !!store.state.user.username)
      let connected = ref(false)

      let socket = {}

      provide('socketConnected', connected)
      provide('socketEmit', (...args) => { socket.emit(...args) })
      provide('socketOn', (...args) => { socket.on(...args) })
      provide('socketOnce', (...args) => { socket.once(...args) })
      provide('socketOff', (...args) => { socket.off(...args) })
      provide('socketRemoveAll', (...args) => { socket.removeAllListeners(...args) })
      provide('socketOnAny', (...args) => { socket.onAny(...args) })
      provide('socketPrependAny', (...args) => { socket.prependAny(...args) })
      provide('socketOffAny', (...args) => { socket.offAny(...args) })

      const initIO = () => {
        socket = io()

        socket.on('reconnect', () => {
          console.log('WS: Reconnected.')
          connected.value = true
        })

        socket.on('connect', () => {
          console.log('WS: Connected.')
          connected.value = true
        })

        socket.on('disconnect', () => {
          console.log('WS: Disconnected.')
          connected.value = false
        })

        socket.on('message', (data) => {
          console.log('WS: Message.', data)
        })
      }

      watch(loggedIn, () => {
        if(loggedIn.value){
          console.log('User: Logged in.')
          initIO()
          socket.connect()
        } else {
          console.log('User: Logged out.')
          socket.disconnect()
        }
      })

      return {
        loggedIn,
        connected,
      }
    }
  }
</script>

<style lang="scss">
*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: $color-fade-grey;
  margin: 10px;
}

#nav {
  padding: 30px;
  background-color: white;

  a {
    font-weight: bold;
    color: $color-light-text;

    &.router-link-exact-active {
      color: $color-highlight;
    }
  }
}

#page {
  width: 960px;
  min-height: 100vh;
  height: 100%;
  padding: 10px;
  margin: 0 auto;
  background-color: $color-fade-grey;
}
</style>
