<template>
  <div class="association">
    Das sind die Vereinsstammdaten.
  </div>
</template>

<script>
import { api, setTitle } from '@/helper'
import { useRoute } from 'vue-router'
import Button from '@/components/Button'

export default {
  name: 'AssociationsProfile',
  components: {
    Button,
  },
  setup(){
    const route = useRoute()
    setTitle(`Verein ${route.params.associationId}`)

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
