<template>
  <div class="lineupupdate">
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
    name: 'UpdateLineUp',
    components: {
      Form,
    },
    setup(){
      setTitle('Mannschaftsaufstellung aktualisieren')
      const router = useRouter()
      const route = useRoute()
      const rows = ref()


      api(`/associations/${route.params.associationId}/teams/${route.params.teamId}/members`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }
        rows.value = [
          { name: 'member', text: 'Mannschaftsaufstellung', field: 'h2' },
          { name: 'E1', text: 'Spieler 1 - E1:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true }, value:res.data.E1 },
          { name: 'E2', text: 'Spieler 2 -  E2:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true }, value:res.data.E2 },
          { name: 'E3', text: 'Spieler 3 -  E3:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true }, value:res.data.E3 },
          { name: 'DD1', text: 'Spieler 4 -  DD1:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true }, value:res.data.DD1},
          { name: 'DD2', text: 'Spieler 5 -  DD2:', field: 'search', apiPath: '/persons', displayFormat: '{{ name }}', lookupRow: ['name'], returnPath: 'id', validate: { required: true }, value:res.data.DD2 },
         ]
      })

      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: `/associations/${route.params.associationId}/teams/${route.params.teamId}/membersUpdate`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Mannschaftsaufstellung wurde aktualisiert.'
            setTimeout(() => router.push({ path: `/associations/${route.params.associationId}/teams/` }), 3000)
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
