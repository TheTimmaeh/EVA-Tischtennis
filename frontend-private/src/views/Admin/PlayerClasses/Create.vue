<template>
  <div class="playerClasses">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
 import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'CreatePlayerClass',
    components: {
      Form,
    },
    setup(){
      setTitle('Spielerklasse anlegen')
      const router = useRouter()
      const message = ref('')

      const submit = (data) => {
        message.value = ''

       api({ method: 'POST', path: '/playerClasses', data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Spielerklasse wurde angelegt.'
            setTimeout(() => router.push({ path: '/admin/playerClasses' }), 3000)
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
          { name: 'age_from', text: 'Mindestalter:', field: 'input', type: 'number', min: 6, max: 100, validate: { type: validate.types.age, required: true } },
          { name: 'age_to', text: 'Maximales Alter:', field: 'input', type: 'number', min: 6, max: 100, validate: { type: validate.types.age, required: true } },
          { name: 'gender', text: 'Geschlecht:', field: 'genderSelect', validate: {  required: true } },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
