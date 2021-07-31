<template>
  <Card class="delete">
      <div class="playerClasses">
    <div class="message" v-if="message">{{ message }}</div>

    Bist du sicher, dass du die Spielerklasse {{playerClass.name}} mit allen zugehörigen Informationen löschen möchtest?

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
    name: 'DeletePlayerClass',
    components: {
      Button,
      Card,
    },
    setup(){
      setTitle('Spielerklasse löschen')
      const router = useRouter()
      const route = useRoute()
      const message = ref('')

      const playerClass = ref({})

      api(`/playerClasses/${route.params.playerClassId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        playerClass.value = res.data
      })

      const confirm = () => {
        message.value = ''

        api({ method: 'DELETE', path: `/playerClasses/${route.params.playerClassId}` }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Spielerklasse wurde gelöscht.'
            setTimeout(() => router.push({ path: `/playerClasses` }), 3000)
          }
        }).catch((err) => {
          message.value = err
        })
      }

      const deny = () => {
        router.push({ path: `/playerClasses` })
      }

      return {
        playerClass,
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
.playerClass{
  padding: 80px 0;
  height:10px
}
</style>
