<template>
  <div class="association">
    <router-link :to="`/associations/${$route.params.id}/members`">Mitglieder</router-link>
    <router-link :to="`/associations/${$route.params.id}/teams`">Mannschaften</router-link>

    {{ $route.params.id }}<br /><br />

    <router-view></router-view>
  </div>
</template>

<script>
import { api, setTitle } from '@/helper'

export default {
  name: 'Associations',
  components: {
  },
  setup(){
    setTitle('Verein')

    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
