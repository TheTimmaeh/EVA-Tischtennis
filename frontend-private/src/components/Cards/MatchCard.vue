<template>
  <Card class="matchCard">
    <tr>
      <td><b>Heimspieler:</b> <br> {{ home1.name }} {{ home1.surname }} <br> {{ home2.name }} {{ home2.surname }} </td>
      <td><b>Gastpieler:</b> <br> {{ visitor1.name }} {{ visitor1.surname }} <br> {{ visitor2.name }} {{ visitor2.surname }}</td>
      <td><b>Schiedsricher:</b> <br> {{ referee.name }} {{ referee.surname }}</td>
      <td class="score min pleft">{{ data.home_score }}</td>
      <td class="score min pcenter">:</td>
      <td class="score min pright">{{ data.visitor_score }}</td>
      <td class="min">
        <router-link :to="`/competitions/${$route.params.competitionId}/encounters/${$route.params.encounterId}/matches/${id}/update`">
          <Button><Icon type="edit" /></Button>
        </router-link>&nbsp;
        <router-link :to="`/competitions/${$route.params.competitionId}/encounters/${$route.params.encounterId}/matches/${id}`">
          <Button><Icon type="tabletennis" /> Starten</Button>
        </router-link>
      </td>
    </tr>
  </Card>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { api, setTitle, validate } from '@/helper'
import Button from '@/components/FormElements/Button'
import Card from '@/components/Cards/Card'
import Icon from '@/components/Icons/Icon'
import { ref } from 'vue'

export default {
  name: 'MatchCard',
  components:{
    Button,
    Card,
    Icon,
  },
  props: {
      data: {
        type: Object,
        required: true,
      },
    },
  setup(props){

      const referee = ref({})

      api(`/persons/${props.data.referee}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        referee.value = res.data
      })

      const home1 = ref({})

      api(`/persons/${props.data.home_player_1}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        home1.value = res.data
      })

      const home2 = ref({})

      api(`/persons/${props.data.home_player_2}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        home2.value = res.data
      })

      const visitor1 = ref({})

      api(`/persons/${props.data.visitor_player_1}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        visitor1.value = res.data
      })

      const visitor2 = ref({})

      api(`/persons/${props.data.visitor_player_2}`).then((res) => res.data).then((res) => {
        if(!res.success){
          console.error('Fehler...', res)
          return
        }

        visitor2.value = res.data
      })
    return {
      ...props.data,
      referee,
      home1,
      home2,
      visitor1,
      visitor2,
    }
  },
}
</script>

<style lang="scss" scoped>
  .matchCard{
    width: 80%;
    margin: 10px;
  }
  tr{
      text-align: inherit;
  }
  td{
      text-align: inherit;
      display: table-cell;
      width: 30em;
  }
  .min {
      width: 1%;
      white-space: nowrap;
  }

  .score {
    font-size: 200%;
    font-weight: 700;
    vertical-align: middle;
  }

  .pleft {
    padding-left: 20px;
  }

  .pcenter {
    padding-right: 5px;
    padding-left: 5px;
  }

  .pright {
    padding-right: 20px;
  }
</style>
