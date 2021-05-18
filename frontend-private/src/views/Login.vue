<template>
  <div class="home">
    <div class="message" v-if="message">{{ message }}</div>
    <label for="username">Username:</label> <InputField id="username" type="text" v-model="username" /><br />
    <label for="password">Password:</label> <InputField type="password" v-model="password" /><br />
    <VButton @action="login()">Login</VButton>
  </div>
</template>

<script>
import { axios } from '@/helper'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InputField from '@/components/InputField'
import VButton from '@/components/VButton'

export default {
  name: 'Login',
  components: {
    InputField,
    VButton,
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

          router.push({ path: '/' })
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
