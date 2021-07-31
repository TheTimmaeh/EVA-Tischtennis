<template>
  <div class="encounters">
    <div class="message" v-if="message">{{ message }}</div>
    <Form :key="version" :rows="rows" @onValid="submit($event)" @onInvalid="invalid($event)" />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { api, setTitle, validate } from '@/helper'
  import Form from '@/components/FormElements/Form'

  export default {
    name: 'UpdateEncounters',
    components: {
      Form,
    },
    setup(){
      setTitle('Match aktualisieren')
      const router = useRouter()
      const route = useRoute()
      const rows = ref([])
      const version = ref(0)

      api(`/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches/${route.params.matchId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        rows.value = [
          { name: 'match', text: 'Spiel', field: 'h2' },
          { name: 'referee', text: 'Schiedsrichter:', field: 'search', apiPath: '/users', displayFormat: '{{ username }}', lookupRow: ['username'], returnPath: 'id', validate: { required: true }, value: res.data.referee },
        ]

        version.value++
      })

      const message = ref('')

      const submit = (data) => {
        message.value = ''

        api({ method: 'POST', path: `/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches/${route.params.matchId}`, data }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Spieldaten wurde aktualisiert.'
            setTimeout(() => router.push({ path: `/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches/` }), 3000)
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
        version,
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
