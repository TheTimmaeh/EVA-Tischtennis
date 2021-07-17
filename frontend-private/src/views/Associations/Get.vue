<template>
  <div class="association">
    Verein {{ $route.params.associationId }}

    <router-link :to="`/associations/${$route.params.associationId}/teams`"><Button>Mannschaften</Button></router-link>
    
    <br /><br />

    <router-view></router-view>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'AssociationsGet',
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
