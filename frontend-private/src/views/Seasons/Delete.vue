<template>
  <Card class="delete">
      <div class="seasons">
    <div class="message" v-if="message">{{ message }}</div>

    Bist du sicher, dass du die Season {{ season.title }} löschen möchtest?

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
    name: 'DeleteSeason',
    components: {
      Button,
      Card,
    },
    setup(){
      setTitle('Season löschen')
      const router = useRouter()
      const route = useRoute()
      const message = ref('')

      const season = ref({})

      api(`/seasons/${route.params.seasonId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        season.value = res.data
      })

      const confirm = () => {
        message.value = ''

        api({ method: 'DELETE', path: `/seasons/${route.params.seasonId}` }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Saison wurde gelöscht.'
            setTimeout(() => router.push({ path: '/seasons' }), 3000)
          }
        }).catch((err) => {
          message.value = err
        })
      }

      const deny = () => {
        router.push({ path: '/seasons' })
      }

      return {
        season,
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
.seasons{
  padding: 80px 0;
  height:10px
}
</style>
