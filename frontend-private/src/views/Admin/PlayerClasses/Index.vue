<template>
  <div class="playerClasses">
    <router-link to="/admin/playerClasses/create">
      <Button class="mb20">Spielerklasse anlegen</Button> <br>
    </router-link>
    <PlayerClassCard v-for="playerClass in playerClasses" :key="playerClass.id" :playerClass="playerClass"></PlayerClassCard>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { api, setTitle } from '@/helper'
  import Button from '@/components/FormElements/Button'
  import PlayerClassCard from '@/components/Cards/PlayerClassCard'

  export default {
    name: 'PlayerClasses',
    components: {
      Button,
      PlayerClassCard,
    },
    setup(){
      setTitle('Spielerklassen')

      const playerClasses = ref([])

      api('/playerClasses').then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        playerClasses.value = res.data.map((playerClass) => {
          return { id: playerClass.id, name: playerClass.name, age_from: playerClass.age_from, age_to: playerClass.age_to, gender: playerClass.gender }
        })
      })


      return {
        playerClasses
      }
    },
  }
</script>

<style lang="scss" scoped>
  .mb20 {
    margin-bottom: 20px;
  }
</style>
