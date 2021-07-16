<template>
  <div class="associationTeams">
    <router-link :to="`/associations/${$route.params.associationId}/teams/create`">
      <Button>Vereinsmannschaft anlegen</Button> <br>
    </router-link>
    <div class="list">Liste der Vereinsmannschaften</div>
     <TeamCard v-for="team in teams" :key="team.id" :data="team" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { api, setTitle } from '@/helper'
import Button from '@/components/Button'
import TeamCard from '@/components/TeamCard'

export default {
  name: 'AssosiationsTeams',
  components: {
    Button,
    TeamCard,
  },
  setup(){
    const route = useRoute()
    setTitle(`Vereinsmannschaften | Verein ${route.params.associationId}`)

    const teams = ref([])

    api('/associationTeams').then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      teams.value = res.data
    })

    return {
      teams,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
