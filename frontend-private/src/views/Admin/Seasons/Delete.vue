<template>
  <Card>
    <div class="flex">
      <div class="icon">
        <Icon type="warning" primaryColor="#E62965" secondaryColor="#E62965" />
      </div>
      <div>
        <div class="message">{{ message }}</div>
        Bist du sicher, dass du die Season {{ season.title }} löschen möchtest?
        <br /><br />
        <Button class="mright" level="danger" @click="confirm()"><Icon type="approve" /> Löschen</Button>
        <Button @click="deny()"><Icon type="deny" /> Zurück</Button>
      </div>
    </div>
  </Card>
</template>


<script>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { api, setTitle } from '@/helper'
  import Button from '@/components/FormElements/Button'
  import Card from '@/components/Cards/Card'
  import Icon from '@/components/Icons/Icon'

  export default {
    name: 'DeleteSeason',
    components: {
      Button,
      Card,
      Icon,
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
            setTimeout(() => router.push({ path: '/admin/seasons' }), 3000)
          }
        }).catch((err) => {
          message.value = err
        })
      }

      const deny = () => {
        router.push({ path: '/admin/seasons' })
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
  .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 25px 50px;
  }

  .icon {
    height: 200px;
    width: 200px;
    float: left;
    margin-right: 100px;
  }

  .message {
    margin-bottom: 20px;
    font-weight: 600;
    height: 16px;
    line-height: 16px;
  }

  .mright {
    margin-right: 20px;
  }
</style>
