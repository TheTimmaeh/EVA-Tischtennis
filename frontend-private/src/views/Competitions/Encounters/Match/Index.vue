<template>
  <div class="matches">
    <MatchCard v-for="match in matches" :key="match.id" :data="match"></MatchCard>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { api, setTitle, useSocket } from '@/helper'
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

    const socket = useSocket()

    const matches = ref([])

    api(`/competitions/${route.params.competitionId}/encounters/${route.params.encounterId}/matches`).then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      matches.value = res.data
    })

    try {
      socket.on('matchUpdate', (data) => {
        if(data.type == 'score'){
          matches.value.map((m) => {
            m.sets = m.sets.map((s) => {
              if(s.id === data.set) s[`${data.player}_score`]++
              return s
            })
            return m
          })
        } else if(data.type == 'scoreSub'){
          matches.value.map((m) => {
            m.sets = m.sets.map((s) => {
              if(s.id === data.set) s[`${data.player}_score`]--
              return s
            })
            return m
          })
        } else if(data.type == 'end'){
          matches.value.map((m) => {
            if(m.id === data.match) m.home_score = data.home_score, m.visitor_score = data.visitor_score
            return m
          })
        }
      })
    } catch(err){
      console.error(err)
    }

    onUnmounted(() => {
      socket.off('matchUpdate')
    })

    return {
      matches,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
