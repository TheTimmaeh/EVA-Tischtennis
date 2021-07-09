<template>
  <div class="associationTeams">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/Form'

  export default {
    name: 'CreateAssociationTeam',
    components: {
      Form,
    },
    setup(){
      const router = useRouter()
      const route = useRoute()
      setTitle(`Vereinsmannschaft anlegen | Verein ${route.params.associationId}`)
      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: '/assosiationTeams', data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Vereinsmannschaft wurde angelegt.'
            setTimeout(() => router.push({ path: '/assosiationTeams' }), 3000)
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
          { name: 'member', text: 'Mannschaft', field: 'h2' },
          { name: 'nameAssociationClass', text: 'Name der Vereinsmannschaft:', field: 'input', type: 'text', validate: { min: 3, max: 255, required: true } },
          { name: 'season', text: 'Saison:', field: 'search', apiPath: '/seasons', displayFormat: '{{ title }}', lookupRow: ['title'], returnPath: 'id', validate: { required: true } },
          { name: 'playerClass', text: 'Spielerklasse:', field: 'search', apiPath: '/playerClasses', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },

          { name: 'member', text: 'Mannschaftsaufstellung', field: 'h2' },
          { name: 'player1', text: 'Spieler 1:', field: 'search', apiPath: '/members', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          { name: 'player2', text: 'Spieler 2:', field: 'search', apiPath: '/members', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          { name: 'player3', text: 'Spieler 3:', field: 'search', apiPath: '/members', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          { name: 'player4', text: 'Spieler 4:', field: 'search', apiPath: '/members', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
          { name: 'player5', text: 'Spieler 5:', field: 'search', apiPath: '/members', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true } },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
