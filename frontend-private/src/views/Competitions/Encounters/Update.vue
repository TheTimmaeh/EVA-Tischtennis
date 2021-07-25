<template>
  <div class="encounters">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute   } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'UpdateEncounters',
    components: {
      Form,
    },
    setup(){
      setTitle('Begegnung aktualisieren')
      const router = useRouter()
      const route = useRoute()
      const rows = ref()

      api(`/competitions/${route.params.competitionId}/encounters`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }
        console.log(res.data)

        rows.value = [
          { name: 'encounter', text: 'Begegnung', field: 'h2' },
          { name: 'home', text: 'Heimmannschaft:', field: 'search', apiPath: '/association_teams', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true }, value:res.data.home },
          { name: 'guest', text: 'Gastmannschaft:', field: 'search', apiPath: '/association_teams', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true }, value:res.data.visitor },
          { name: 'date', text: 'Datum:', field: 'input', type: 'date', validate: { type: validate.types.date, required: true } , value:res.data.datetime},
          { name: 'gamestage', text: 'Spielstude:', field: 'gamestageSelect', validate: { min: 1, max: 2, required: true }, value:res.data.game_stage }, 
      ]
      })

      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: `/competitions/${route.params.competitionId}/encounters/update`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Begegnung wurde aktualisiert.'
            setTimeout(() => router.push({ path: '/encounters' }), 3000)
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
