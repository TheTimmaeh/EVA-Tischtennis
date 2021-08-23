<template>
  <div class="competition">
    <Card>
      <div class="header">
        {{ competition.name }}
      </div>
      <div class="body">
        Saison: {{ competition.season }}<br />
        Spielerklasse: {{ competition.player_class }}<br />
        Beschreibung: {{ competition.description }}<br />
      </div>
    </Card>
  </div>
</template>

<script>
  import { ref, watch } from 'vue'
  import { api, setTitle } from '@/helper'
  import Card from '@/components/Cards/Card'
  import CompetitionTable from '@/components/Tables/CompetitionTable'

  export default {
    name: 'CompetitionsProfile',
    components: {
      Card,
      CompetitionTable,
    },
    setup(){
      const competition = ref({})

      watch(competition, () => {
        setTitle(`${competition.value.name}`)
      })

      return {
        competition,
      }
    },
    beforeRouteEnter(to, from, next){
      api(`/competitions/${to.params.competitionId}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        next((vm) => vm.competition = res.data)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    font-size: 14px;
    font-weight: bold;
    padding: 16px;
    position: relative;
    border: 1px solid $color-mono-light;
    border-width: 0 0 1px;
  }

  .body {
    padding: 16px;
    font-size: 14px;
    line-height: 1.5;
  }

  .min {
    width: 1%;
    white-space: nowrap;
  }
</style>
