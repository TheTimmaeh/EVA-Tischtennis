<template>
  <Card class="delete">
    <div class="members">
      <div class="message" v-if="message">{{ message }}</div>

      Bist du sicher, dass du das Mitglied {{ season.title }} löschen möchtest?

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
    name: 'DeleteMember',
    components: {
      Button,
      Card,
    },
    setup(){
      setTitle('Mitglied löschen')
      const router = useRouter()
      const route = useRoute()
      const message = ref('')

      const member = ref({})

      api(`/persons/${route.params.memberId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        member.value = res.data
      })

      const confirm = () => {
        message.value = ''

        api({ method: 'DELETE', path: `/persons/${route.params.memberId}` }).then((res) => {
          if(!res.data){
            message.value = 'Unknown Error.'
          } else if(!res.data.success){
            message.value = res.data.message
          } else {
            message.value = 'Mitglied wurde gelöscht.'
            setTimeout(() => router.push({ path: '/members' }), 3000)
          }
        }).catch((err) => {
          message.value = err
        })
      }

      const deny = () => {
        router.push({ path: `/associations/${route.params.associationId}/members` })
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
  .delete {
    height: 200px;
  }
  
  .members {
    padding: 80px 0;
    height: 10px;
  }
</style>
