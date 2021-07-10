<template>
  <div class="association">
    Liste der Vereinsmitglieder
  </div>
</template>

<script>
import { api, setTitle } from '@/helper'
import { useRoute } from 'vue-router'
import Button from '@/components/Button'

export default {
  name: 'AssociationsMembers',
  components: {
    Button,
  },
  setup(){
    const route = useRoute()
    setTitle(`Vereinsmitglieder | Verein ${route.params.associationId}`)

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
