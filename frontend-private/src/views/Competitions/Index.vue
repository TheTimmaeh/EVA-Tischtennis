<template>
  <div class="competitions">
    <router-link to="/competitions/create">
      <Button>Turnier anlegen</Button> <br>
    </router-link>
    <div class="list">Liste der Turniere</div>
    <CompetitionCard v-for="competition in competitions" :key="competition.id" :data="competition"></CompetitionCard>
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Button from '@/components/Button'
import CompetitionCard from '@/components/CompetitionCard'

export default {
  name: 'Competitions',
  components: {
    Button,
    CompetitionCard,
  },
  setup(){
    setTitle('Tuniere')

    const competitions = ref([])

    api('/competitions').then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      competitions.value = res.data
    })


    return {
      competitions,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
