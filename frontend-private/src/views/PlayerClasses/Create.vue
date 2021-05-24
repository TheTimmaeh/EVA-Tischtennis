<template>
  <div class="playerClasses">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { axios, validate } from '@/helper'
  import Form from '@/components/Form'

  export default {
    name: 'CreatePlayerClass',
    components: {
      Form,
    },
    setup(){
      const router = useRouter()
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        axios().post('/playerClasses/create/success', data).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Spielerklasse wurde angelegt.'
            console.log(res.data)
            setTimeout(() => router.push({ path: '/playerClasses' }), 3000)
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
          { name: 'name', text: 'Name der Spielerklasse:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'age', text: 'Mindestalter:', field: 'input', type: 'number', min: 6, max: 100, validate: { type: validate.types.number, required: true } },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
