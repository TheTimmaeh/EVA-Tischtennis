<template>
  <div class="association">
    <Menu>
      <router-link :to="`/associations/${$route.params.associationId}`">Vereinsübersicht</router-link>
      <router-link :to="`/associations/${$route.params.associationId}/teams`">Mannschaften</router-link>
      <router-link :to="`/associations/${$route.params.associationId}/members`">Mitglieder</router-link>
    </Menu>
    <Page></Page>
  </div>
</template>

<script>
import Page from '@/components/Page'
import Menu from '@/components/Menu'

export default {
  name: 'AssociationsGet',
  components: {
    Page,
    Menu,
  },
  setup(){
    return { }
  },
}
</script>

<style lang="scss" scoped>
</style>
