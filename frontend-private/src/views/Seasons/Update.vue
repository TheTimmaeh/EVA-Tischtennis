<template>
  <div class="seasons">
    <div class="message" v-if="message">{{ message }}</div>
    <Form v-if="rows" :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/Form'

  export default {
    name: 'UpdateSeason',
    components: {
      Form,
    },
    setup(){
      setTitle('Season aktualisieren')
      const router = useRouter()
      const route = useRoute()
      const rows = ref()

      api(`/seasons/${route.params.associationId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        rows.value = [
          { name: 'year', text: 'Jahr der Saison:', field: 'input', type: 'number', min: 1874, max: new Date().getFullYear(), validate: { type: validate.types.year, required: true }, value: res.data.year },
          { name: 'season', text: 'Saison:', field: 'seasonSelect', validate: { min: 2, max: 2, required: true }, value: res.data.season },
          { name: 'title', text: 'Titel:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value: res.data.title },
          { name: 'description', text: 'Beschreibung:', field: 'textarea', validate: { max: 2000 }, value: res.data.description },
        ]
      })

      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: `/seasons/${route.params.associationId}`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Saison wurde aktualisiert.'
            setTimeout(() => router.push({ path: '/seasons/' }), 3000)
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
