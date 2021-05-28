<template>
  <div class="home">
    <div class="message" v-if="message">{{ message }}</div>
    <label for="username">Username:</label> <InputField label="username" type="text" v-model="username" /><br />
    <label for="password">Password:</label> <InputField label="password" type="password" v-model="password" /><br />
    <Button @action="login()">Login</Button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { axios } from '@/helper'
import InputField from '@/components/InputField'
import Button from '@/components/Button'

export default {
  name: 'Login',
  components: {
    InputField,
    Button,
  },
  setup(){
    const store = useStore()
    const router = useRouter()

    let message = ref()
    let username = ref()
    let password = ref()

    let login = () => {
      axios().post('/auth', { username: username.value, password: password.value }).then((res) => {
        if(!res.data){
          message.value = 'Unknown Error.'
        } else if(!res.data.success){
          message.value = res.data.message
        } else {
          message.value = 'Login erfolgreich.'
          store.dispatch('updateUser', res.data.user)

          setTimeout(() => router.push({ path: '/' }), 3000)
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
