<template>
  <div class="competition">
    Turnier {{ $route.params.competitionId }}

    <router-link :to="`/competitions/${$route.params.competitionId}/encounters`">
      <Button>Begegnungen</Button>
    </router-link>

    <br /><br />

    <router-view></router-view>
  </div>
</template>

<script>
import Button from '@/components/FormElements/Button'

export default {
  name: 'CompetitionsGet',
  components: {
    Button,
  },
  setup(){
    return {
      Button,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
