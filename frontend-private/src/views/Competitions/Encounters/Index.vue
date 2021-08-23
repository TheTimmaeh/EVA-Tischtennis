<template>
  <div class="encounters">
    <router-link v-if="isAdmin" :to="`/competitions/${$route.params.competitionId}/encounters/create`">
      <Button>Begegnung anlegen</Button> <br>
    </router-link><br/>
    <EncountersCard v-for="encounter in encounters" :key="encounter.id" :data="encounter" :isAdmin="isAdmin"></EncountersCard>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
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
    setTitle('Begegnungen')
    const route = useRoute()
    const store = useStore()
    let isAdmin = computed(() => !!store?.state?.user?.isAdmin)

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
      isAdmin,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
