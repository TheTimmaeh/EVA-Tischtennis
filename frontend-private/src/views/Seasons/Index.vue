<template>
  <div class="saisons">
    <router-link to="/seasons/create">
      <Button>Saison anlegen</Button> <br>
    </router-link>
    <div class="list">Liste zur Saisonübersicht</div>
    <SeasonCard v-for="season in seasons" :key="season.id" :data="season" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Button from '@/components/Button'
import SeasonCard from '@/components/SeasonCard'

export default {
  name: 'Saisons',
  components: {
    Button,
    SeasonCard,
  },
  setup(){
    setTitle('Saisons')

    const seasons = ref([])

    api('/seasons').then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      seasons.value = res.data
    })

    return {
      seasons,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
