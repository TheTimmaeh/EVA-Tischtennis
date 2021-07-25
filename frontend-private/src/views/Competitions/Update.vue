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
    name: 'UpdateCompetition',
    components: {
      Form,
    },
    setup(){
      setTitle('Turnier aktualisieren')
      const router = useRouter()
      const route = useRoute()
      const rows = ref()

      api(`/competitions/${route.params.competitionId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }
        rows.value = [
          { name: 'competition', text: 'Turnier', field: 'h2' },
          { name: 'name', text: 'Name:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true }, value: res.data.name },
          { name: 'season', text: 'Saison:', field: 'search', apiPath: '/seasons', displayFormat: '{{ title }}', lookupRow: ['title'], returnPath: 'id', validate: { required: true }, value: res.data.season },
          { name: 'playerClass', text: 'Spielerklasse:', field: 'search', apiPath: '/playerClasses', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true }, value: res.data.player_class },
          { name: 'description', text: 'Beschreibung:', field: 'textarea', validate: { max: 2000 }, value: res.data.description },
        ]
      })

      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: `/competitions/${route.params.competitionId}`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'User wurde aktualisiert.'
            setTimeout(() => router.push({ path: '/competitions/' }), 3000)
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
