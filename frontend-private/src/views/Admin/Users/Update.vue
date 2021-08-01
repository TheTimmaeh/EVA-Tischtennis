<template>
  <div class="users">
    <div class="message" v-if="message">{{ message }}</div>
    <Form v-if="rows" :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute  } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'UpdateUser',
    components: {
      Form,
    },
    setup(){
      setTitle('User aktualisieren')
      const router = useRouter()
      const route = useRoute()
      const rows = ref()

      api(`/users/${route.params.userId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }
        rows.value = [
          { name: 'member', text: 'User', field: 'h2' },
          { name: 'username', text: 'Username:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value: res.data.username },
          { name: 'isAdmin', text: 'Ist Admin?:', field: 'checkbox', returnValue: 'true',  checked: res.data.isAdmin },
        ]
      })

      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: `/users/${route.params.userId}`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'User wurde aktualisiert.'
            setTimeout(() => router.push({ path: '/admin/users/' }), 3000)
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
        rows,
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
