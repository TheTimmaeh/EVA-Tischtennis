<template>
  <div class="competitions">
    <router-link to="/competitions/create">
      <Button id="myButton" >Turnier anlegen</Button> <br>
    </router-link>
    <div class="list">Liste der Turniere</div>
    <CompetitionCard v-for="competition in competitions" :key="competition.id" :data="competition"  ></CompetitionCard>
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Button from '@/components/Button'
import CompetitionCard from '@/components/CompetitionCard'

export default {
  name: 'Competitions',
  components: {
    Button,
    CompetitionCard,
  },
  setup(){
    setTitle('Tuniere')

    const Competitions = ref([])

    api('/competitions').then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      competitions.value = res.data.map((competition) => {
        return { competition: playerClass.id, name: competition.name, startdate: competition.startdate, enddate: competition.enddate, class: competition.class, street: competition.street, streetnumber: competition.streetnumber, zipcode: competition.zipcode, city: competition.city, state: competition.state, county: competition.country, phone: competition.phone, mail: competition.mail, webiste: competition.website }
      })
    })


    return { }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
