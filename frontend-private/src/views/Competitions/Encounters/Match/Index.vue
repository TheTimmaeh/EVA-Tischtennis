<template>
  <div class="matches">
    <MatchCard v-for="match in matches" :key="match.id" :data="match"></MatchCard>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { api, setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'
import MatchCard from '@/components/Cards/MatchCard'

export default {
  name: 'AssosiationsTeams',
  components: {
    Button,
    MatchCard,
  },
  setup(){
    const route = useRoute()
    setTitle(`Begegnungen | Spiele der Begegnung ${route.params.encounterId}`)

    const matches = ref([])

    api(`/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches`).then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      matches.value = res.data
    })

    return {
      matches,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
