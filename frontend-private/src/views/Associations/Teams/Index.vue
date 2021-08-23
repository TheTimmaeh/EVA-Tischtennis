<template>
  <div class="associationTeams">
    <router-link v-if="isAdmin" :to="`/associations/${$route.params.associationId}/teams/create`">
      <Button>Vereinsmannschaft anlegen</Button> <br>
    </router-link>
     <TeamCard v-for="team in teams" :key="team.id" :data="team" :isAdmin="isAdmin" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { api, setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'
import TeamCard from '@/components/Cards/TeamCard'

export default {
  name: 'AssosiationsTeams',
  components: {
    Button,
    TeamCard,
  },
  setup(){
    const route = useRoute()
    setTitle(`Vereinsmannschaften | Verein ${route.params.associationId}`)
    const store = useStore()
    let isAdmin = computed(() => !!store?.state?.user?.isAdmin)

    const teams = ref([])

    api(`/associations/${route.params.associationId}/teams`).then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      teams.value = res.data
    })

    return {
      teams,
      isAdmin,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
