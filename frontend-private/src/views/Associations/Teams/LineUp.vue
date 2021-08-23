<template>
  <div class="LineUp">
    <div class="list">Mannschaftsaufstellung</div>
    <LineUpCard :data="members" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { api, setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'
import LineUpCard from '@/components/Cards/LineUpCard'

export default {
  name: 'Mannschaftsaufstellung',
  components: {
    Button,
    LineUpCard,
  },
  setup(){
    const route = useRoute()
    setTitle(`Mannschaftsaufstellung | Verein ${route.params.associationId} | Mannschaft ${route.params.teamId}`)

    const members = ref([])

    api(`/lineup/${route.params.teamId}`).then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      members.value = res.data
    })

    return {
      members,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
