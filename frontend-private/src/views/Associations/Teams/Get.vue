<template>
  <div class="associationTeams">
    Mannschaft {{ $route.params.teamId }}

    Das sind die Vereinsmannschaftsstammdaten.
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { api, setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'
import TeamCard from '@/components/Cards/TeamCard'

export default {
  name: 'assosiationsTeams',
  components: {
    Button,
    TeamCard,
  },
  setup(){
    const route = useRoute()
    setTitle(`Vereinsmannschaft ${route.params.teamId} | Verein ${route.params.associationId}`)

    return { }
  },
}
</script>

<style lang="scss" scoped>
</style>
