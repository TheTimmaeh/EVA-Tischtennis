<template>
  <div class="saisons">
    <router-link to="/admin/seasons/create">
      <Button class="mb20">Saison anlegen</Button> <br>
    </router-link>
    <SeasonCard v-for="season in seasons" :key="season.id" :data="season" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'
import SeasonCard from '@/components/Cards/SeasonCard'

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
  .mb20 {
    margin-bottom: 20px;
  }
</style>
