<template>
  <Card class="delete">
      <div class="encounters">
    <div class="message" v-if="message">{{ message }}</div>

    Bist du sicher, dass du die Begegnung mit allen zugehörigen Informationen löschen möchtest?

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
    name: 'DeleteEncounter',
    components: {
      Button,
      Card,
    },
    setup(){
      setTitle('Begegnung löschen')
      const router = useRouter()
      const route = useRoute()
      const message = ref('')

      const encounter = ref({})

      api(`/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        encounter.value = res.data
      })

      const confirm = () => {
        message.value = ''

        api({ method: 'DELETE', path: `/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}` }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Begegnung wurde gelöscht.'
            setTimeout(() => router.push({ path: `/competitions/${route.params.competitionId}/encounters` }), 3000)
          }
        }).catch((err) => {
          message.value = err
        })
      }

      const deny = () => {
        router.push({ path: `/competitions/${route.params.competitionId}/encounters` })
      }

      return {
        encounter,
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
.encounters{
  padding: 80px 0;
  height:10px
}
</style>
