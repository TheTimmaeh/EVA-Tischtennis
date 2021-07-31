<template>
  <Card>
    <tr>
      <td>Heimspieler: {{home_player}}</td>
      <td>Gastpieler: {{visitor_player}}</td>
      <td>Schiedsricher: {{referee}}</td>
      <td>Punktestand Heim: {{home_score}}</td>
      <td>Punktestand Gast: {{visitor_score}}</td>
      <td>
        <router-link :to="`/matches/${id}/delete`">
            <Button level="danger">Löschen</Button>
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
import { ref } from 'vue'

export default {
  name: 'MatchCard',
  components:{
    Button,
    Card,
    },
  props: {
      data: {
        type: Object,
        required: true,
      },
    },
  setup(props){

    return {
      ...props.data,
    }
  },
}
</script>

<style lang="scss" scoped>
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
</style>
