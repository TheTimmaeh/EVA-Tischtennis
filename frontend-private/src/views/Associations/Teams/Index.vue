<template>
  <div class="associationTeams">
    <router-link to="/associationTeams/create">
      <Button id="myButton" >Vereinsmannschaft anlegen</Button> <br>
    </router-link>
    <div class="list">Liste der Vereinsmannschaften</div>
     <TeamCard  v-for="team in teams" :key="team.id" :data="team" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Button from '@/components/Button'
import TeamCard from '@/components/TeamCard'

export default {
  name: 'assosiationsTeams',
  components: {
    Button,
    TeamCard,
  },
  setup(){
    setTitle('Vereinsmannschaften')

    const teams = ref([])

    api('/associationTeams').then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      teams.value = res.data.map((team) => {
        return { team: team.id, name: team.nameAssociationClass, season: team.seasons, playerClass: team.playerClass, player1:team.player1, player2:team.player2, player3:team.player3, player4:team.player4, player5:team.player5,}
      })
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
