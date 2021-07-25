<template>
  <div class="seasons">
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
    name: 'CreateSeason',
    components: {
      Form,
    },
    setup(){
      setTitle('Season anlegen')
      const router = useRouter()
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: '/seasons', data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Saison wurde angelegt.'
            setTimeout(() => router.push({ path: '/seasons' }), 3000)
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
          { name: 'year', text: 'Jahr der Saison:', field: 'input', type: 'number', min: 1874, max: new Date().getFullYear() + 10, validate: { type: validate.types.year, required: true } },
          { name: 'season', text: 'Saison:', field: 'seasonSelect', validate: { min: 2, max: 2, required: true } },
          { name: 'title', text: 'Titel:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'description', text: 'Beschreibung:', field: 'textarea', validate: { max: 2000 } },
       ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
