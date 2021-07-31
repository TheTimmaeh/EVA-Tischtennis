<template>
  <div class="matches">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'CreateMatch',
    components: {
      Form,
    },
    setup(){
      setTitle('Spiel anlegen')
      const router = useRouter()
      const route = useRoute()
      const message = ref('')

      const submit = (data) => {
        message.value = ''
        console.log(data)
        api({ method: 'POST', path: `/competitions/${route.params.competitionId}/encounters/${route.params.encountersId}/match/create`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Spiel wurde angelegt.'
            setTimeout(() => router.push({ path: `/competitions/${route.params.competitionId}/encounters` }), 3000)
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
          { name: 'match', text: 'Spiel', field: 'h2' },
          { name: 'home_player', text: 'Spieler der Heimmannschaft:', field: 'search', apiPath: '/team_members', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          { name: 'visitor_player', text: 'Spieler der Gastmannschaft:', field: 'search', apiPath: '/team_members', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          { name: 'referee', text: 'Schiedsrichter:', field: 'search', apiPath: '/users', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          
          { name: 'referee', text: 'Schiedsrichter:', field: 'search', apiPath: '/users', displayFormat: '{{ name }} {{ surname }}', lookupRow: ['name', 'surname'], returnPath: 'id', validate: { required: true } },
       ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
