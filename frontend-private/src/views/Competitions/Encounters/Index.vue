<template>
  <div class="encounters">
    <div class="list">Liste der Begegnungen</div>
       
    <EncountersCard v-for="encounter in encounters" :key="encounter.id" :data="encounter"></EncountersCard>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api, setTitle, validate } from '@/helper'
import Button from '@/components/FormElements/Button'
import EncountersCard from '@/components/Cards/EncountersCard'

export default {
  name: 'Encounters',
  components: {
    Button,
    EncountersCard,
  },
  setup(){
    const route = useRoute()
    setTitle('Begegnungen')

    const encounters = ref([])

    api(`/competitions/${route.params.competitionId}/encounters`).then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      encounters.value = res.data
    })

    return {
      encounters,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
