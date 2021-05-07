<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <template v-if="loggedIn">
      <router-link to="/profile">Profil</router-link> |
      <router-link to="/logout">Logout</router-link>
    </template>
    <router-link to="/login" v-else>Login</router-link> |
    Socket: {{ connected ? 'Connected' : 'Disconnected' }}
  </div>
  <router-view/>
</template>

<script>
  import { ref, computed, watch, provide, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { io } from '@/helper'

  export default {
    setup(props, { attrs, slots, emit }){
      const store = useStore()

      let loggedIn = computed(() => !!store.state.user && !!store.state.user.username)
      let connected = ref(false)

      let socket = {}

      provide('socketConnected', connected)
      provide('socketDisconnected', !connected)
      provide('socketEmit', (...args) => { socket.emit(...args) })
      provide('socketOn', (...args) => { socket.on(...args) })

      const initIO = () => {
        socket = io()

        socket.on('reconnect', () => {
          console.log('Reconnected')
          connected.value = true
        })

        socket.on('connect', () => {
          console.log('Connected')
          connected.value = true
        })

        socket.on('disconnect', () => {
          console.log('Disconnected')
          connected.value = false
        })

        socket.on('message', (data) => {
          console.log('Message', data)
        })
      }

      //onMounted(initIO)

      watch(loggedIn, () => {
        if(loggedIn.value){
          console.log('Logged in.')
          initIO()
          socket.connect()
        } else {
          console.log('Logged out.')
          socket.disconnect()
        }
      })

      return {
        loggedIn,
        connected,
        socket,
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
