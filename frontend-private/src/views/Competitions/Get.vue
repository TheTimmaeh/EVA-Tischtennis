<template>
  <div class="competition">
    <Menu>
      <router-link :to="`/competitions/${$route.params.competitionId}`">Tunierübersicht</router-link>
      <router-link :to="`/competitions/${$route.params.competitionId}/encounters`">Begegnungen</router-link>
    </Menu>
    <Page></Page>
  </div>
</template>

<script>
import Page from '@/components/Page'
import Menu from '@/components/Menu'
import Button from '@/components/FormElements/Button'

export default {
  name: 'CompetitionsGet',
  components: {
    Button,
    Page,
    Menu,
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
