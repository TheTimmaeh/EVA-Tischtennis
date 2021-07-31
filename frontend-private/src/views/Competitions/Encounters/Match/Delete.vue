<template>
  <Card class="delete">
      <div class="matches">
    <div class="message" v-if="message">{{ message }}</div>

    Bist du sicher, dass du das Spiel mit allen zugehörigen Informationen löschen möchtest?

    <Button level="danger" @click="confirm()">Ja</Button> 
    <Button @click="deny()">Nein</Button>
    </div>
  </Card>
</template>

<script>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { api, setTitle } from '@/helper'
  import Button from '@/components/FormElements/Button'
  import Card from '@/components/Cards/Card'

  export default {
    name: 'DeleteMatch',
    components: {
      Button,
      Card,
    },
    setup(){
      setTitle('Spiel löschen')
      const router = useRouter()
      const route = useRoute()
      const message = ref('')

      const match = ref({})

      api(`/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches/${route.params.matchId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        match.value = res.data
      })

      const confirm = () => {
        message.value = ''

        api({ method: 'DELETE', path: `/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches/${route.params.matchId}` }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Spiel wurde gelöscht.'
            setTimeout(() => router.push({ path: `/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches` }), 3000)
          }
        }).catch((err) => {
          message.value = err
        })
      }

      const deny = () => {
        router.push({ path: `/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}` })
      }

      return {
        match,
        confirm,
        deny,
        message,
      }
    },
  }
</script>

<style lang="scss" scoped>
.delete{
  height: 200px;
}
.matches{
  padding: 80px 0;
  height:10px
}
</style>
