<template>
  <Card class="delete">
      <div class="associations">
    <div class="message" v-if="message">{{ message }}</div>

    Bist du sicher, dass du den Verein {{association.name}} mit allen zugehörigen Informationen löschen möchtest?

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
    name: 'DeleteAssociation',
    components: {
      Button,
      Card,
    },
    setup(){
      setTitle('Verein löschen')
      const router = useRouter()
      const route = useRoute()
      const message = ref('')

      const association = ref({})

      api(`/associations/${route.params.associationId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        association.value = res.data
      })

      const confirm = () => {
        message.value = ''

        api({ method: 'DELETE', path: `/associations/${route.params.associationId}` }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Verein wurde gelöscht.'
            setTimeout(() => router.push({ path: '/associations' }), 3000)
          }
        }).catch((err) => {
          message.value = err
        })
      }

      const deny = () => {
        router.push({ path: '/associations' })
      }

      return {
        association,
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
.associations{
  padding: 80px 0;
  height:10px
}
</style>
