<template>
  <div class="admin">
    <Menu>
      <router-link to="/admin/components">Components</router-link>
      <router-link :to="`/admin/users`">User</router-link>
      <router-link :to="`/admin/seasons`">Saisons</router-link>
      <router-link :to="`/admin/playerClasses`">Spielerklassen</router-link>
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
