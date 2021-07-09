<template>
  <div class="association">
    <router-link :to="`/associations/${$route.params.associationId}/members`">Mitglieder</router-link>
    <router-link :to="`/associations/${$route.params.associationId}/teams`">Mannschaften</router-link>

    {{ $route.params.associationId }}<br /><br />

    <router-view></router-view>
  </div>
</template>

<script>
import { api, setTitle } from '@/helper'
import Button from '@/components/Button'

export default {
  name: 'Associations',
  components: {
    Button,
  },
  setup(){
    setTitle('Verein')

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
