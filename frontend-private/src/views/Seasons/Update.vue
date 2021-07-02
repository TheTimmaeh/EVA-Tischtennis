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
  import Form from '@/components/Form'

  export default {
    name: 'UpdateSeason',
    components: {
      Form,
    },
    props: {
      id: $route.params.id,
    },
    setup(){
      setTitle('Season aktualisieren')
      const router = useRouter()

      
      const seasons = ref([])

      api('/season').then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
     }

      seasons.value = res.data.map((season) => {
          return { id: season.id, title: season.title, season: season.seasons,  year: season.year, description: season.description}
      })
    })

      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: '/seasons', data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Saison wurde aktualisiert.'
            setTimeout(() => router.push({ path: '/season' }), 3000)
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
        season,
        rows: [
          { name: 'year', text: 'Jahr der Saison:', field: 'input', type: 'number', min: 1874, max: new Date().getFullYear(), validate: { type: validate.types.year, required: true }, displayValue: season.year },
          { name: 'season', text: 'Saison:', field: 'seasonSelect', validate: { min: 2, max: 2, required: true } }, // TODO: mit initialwert von seasonobjekt füllen
          { name: 'title', text: 'Titel:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } , displayValue: season.title},
          { name: 'description', text: 'Beschreibung:', field: 'textarea', validate: { max: 2000 } , displayValue: seasons.description},
       ],
       
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
