<template>
  <div class="home">
    <div class="message" v-if="message">{{ message }}</div>
    <label for="username">Username:</label> <input id="username" name="username" type="text" v-model="username" /><br />
    <label for="password">Password:</label> <input id="password" name="password" type="password" v-model="password" /><br />
    <button @click="login()">Login</button>
  </div>
</template>

<script>
import { axios } from '@/helper'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup(){
    const store = useStore()
    const router = useRouter()

    let message = ref()
    let username = ref()
    let password = ref()

    let login = () => {
      axios().post('/login', { username: username.value, password: password.value }).then((res) => {
        if(!res.data){
          message.value = 'Unknown Error.'
        } else if(!res.data.success){
          message.value = res.data.message
        } else {
          message.value = 'Login erfolgreich.'
          store.dispatch('updateUser', res.data.user)

          router.push({ path: '/socket' })
        }
      }).catch((err) => {
        message.value = err
      })
    }

    return {
      message,
      username,
      password,
      login,
    }
  }
}
</script>
