<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/publicsocket">Public Socket</router-link> |
    <router-link to="/socket">Private Socket</router-link> |
    <template v-if="loggedIn">
      <router-link to="/profile">Profil</router-link> |
      <router-link to="/logout">Logout</router-link>
    </template>
    <router-link to="/login" v-else>Login</router-link>
  </div>
  <router-view/>
</template>

<script>
  import { ref, computed, watch } from 'vue'
  import { useStore } from 'vuex'
  import { io } from '@/helper'

  export default {
    setup(){
      // const store = useStore()

      let loggedIn = computed(() => !!store.state.user.username)

      // let socket
      //
      // watch(loggedIn, () => {
      //   if(loggedIn){
      //     socket = io()
      //     initSocket()
      //   }
      // })
      //
      // const initSocket = () => {
      //   socket.on('reconnect', () => {
      //     console.log('Reconnect')
      //   })
      //
      //   socket.on('connect', () => {
      //     console.log('Connect')
      //   })
      //
      //   socket.on('disconnect', () => {
      //     console.log('Disconnect')
      //   })
      //
      //   socket.on('message', (data) => {
      //     console.log('Message', data)
      //   })
      // }

      return {
        loggedIn
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
