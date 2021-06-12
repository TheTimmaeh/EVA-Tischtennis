<template>
  <div class="users">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/Form'

  export default {
    name: 'CreateUser',
    components: {
      Form,
    },
    setup(){
      setTitle('User anlegen')

      const router = useRouter()
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: '/users', data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = res.data.message
            setTimeout(() => router.push({ path: '/users' }), 3000)
          }
        }).catch((err) => {
          message.value = err
        })
      }

      const invalid = () => {
        message.value = 'Bitte überprüfen Sie Ihre Eingabe.'
      }

      return {
        submit,
        invalid,
        message,
        rows: [
          { name: 'member', text: 'User', field: 'h2' },
          { name: 'username', text: 'Username:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'password', text: 'Passwort:', field: 'input', type: 'password', validate: { min: 3, max: 255, required: true } },
          { name: 'isAdmin', text: 'Ist Admin?:', field: 'checkbox', returnValue: 'true' },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
