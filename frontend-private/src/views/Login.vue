<template>
  <Page>
    <div class="home">
      <div class="message" v-if="message">{{ message }}</div>
      <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
    </div>
  </Page>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { axios, setTitle } from '@/helper'
import Form from '@/components/FormElements/Form'
import Page from '@/components/Page'

export default {
  name: 'Login',
  components: {
    Form,
    Page,
  },
  setup(){
    setTitle('Login')
    const store = useStore()
    const router = useRouter()
    const message = ref()

    const submit = (data) => {
      message.value = ''

      axios().post('/auth', data).then((res) => {
        if(!res.data){
          message.value = 'Unknown Error.'
        } else if(!res.data.success){
          message.value = res.data.message
        } else {
          message.value = 'Login erfolgreich.'
          store.dispatch('updateUser', res.data.user)

          /* router.push({ path: '/' }) */
          router.go(-1)
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
        { name: 'username', text: 'Username:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
        { name: 'password', text: 'Passwort:', field: 'input', type: 'password', validate: { min: 3, max: 255, required: true } },
      ],
    }
  }
}
</script>
