<template>
 <Page>
  <div class="competitions">
    <router-link to="/competitions/create">
      <Button>Turnier anlegen</Button> <br>
    </router-link>
    <div class="list">
    <CompetitionCard v-for="competition in competitions" :key="competition.id" :data="competition"></CompetitionCard>
    </div>
  </div>
  </Page>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'

import Page from '@/components/Page'
import Button from '@/components/FormElements/Button'
import CompetitionCard from '@/components/Cards/CompetitionCard'

export default {
  name: 'Competitions',
  components: {
    Page,
    Button,
    CompetitionCard,
  },
  setup(){
    setTitle('Tuniere')

    const competitions = ref([])

    api('/competitions').then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      competitions.value = res.data
    })


    return {
      competitions,
    }
  },
}
</script>

<style lang="scss" scoped>
  .competitions {
      padding-top: 20px;
    }

  .list{
    padding: 20px;
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;

    &:after {
      content: "";
      flex: auto;
    }
  }
</style>
