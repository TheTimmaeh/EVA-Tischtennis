<template>
  <div>
    <div id="nav">
      <router-link to="/"><span class="icon"><Icon type="tabletennis" primaryColor="#000000" secondaryColor="#000000" scale="2" /></span></router-link>
      <template v-if="loggedIn">
        <router-link to="/competitions">Turniere</router-link>
        <router-link to="/associations">Vereine</router-link>
        <router-link to="/persons">Personen</router-link>
        <router-link to="/admin">Admin</router-link>
        <router-link to="/profile">Profil</router-link>
        <router-link to="/logout"><span class="icon"><Icon type="logout" primaryColor="#000000" secondaryColor="#000000" scale="2" /></span></router-link>
      </template>
      <template v-else>
        <router-link to="/login"><span class="icon"><Icon type="login" primaryColor="#000000" secondaryColor="#000000" scale="2" /></span></router-link>
      </template>
      <!-- Socket: {{ connected ? 'Connected' : 'Disconnected' }} -->
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

  import Button from '@/components/FormElements/Button'
  import Icon from '@/components/Icons/Icon'

  export default {
    components:{
      Button,
      Icon,
    },
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
  }

  #nav {
    background-color: white;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    a {
      height: 100px;
      padding: 0 20px;
      margin: 0 4px;

      display: inline-flex;
      align-items: center;

      font-weight: bold;
      color: $color-mono-dark;

      &:hover {
        background-color: $color-fade-grey;
      }

      &.router-link-exact-active {
        color: $color-highlight;
      }
    }

    .icon {
      height: 16px;
    }
  }

  #page {
    min-height: calc(100vh - 100px);
    background-color: $color-fade-grey;
  }

  a, a:visited, a:focus {
    text-decoration: none;
    color: inherit;
  }
</style>
