<template>
  <div class="seasons">
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
    name: 'CreateSeason',
    components: {
      Form,
    },
    setup(){
      const router = useRouter()
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        axios().post('/seasons/create/success', data).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Saison wurde angelegt.'
            console.log(res.data)
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
          { name: 'year', text: 'Jahr der Saison:', field: 'input', type: 'number', min: 1874, max: new Date().getFullYear(), validate: { type: validate.types.year, required: true } },
          { name: 'summerOrWinter', text: 'Saison:', field: 'seasonSelect' }, 
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
