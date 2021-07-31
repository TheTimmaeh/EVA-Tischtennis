<template>
  <Card>
    <tr>
      <td>Heimspieler: {{ home_player }}</td>
      <td>Gastpieler: {{ visitor_player }}</td>
      <td>Schiedsricher: {{ referee }}</td>
      <td class="score min pleft">{{ home_score }}0</td>
      <td class="score min pcenter">:</td>
      <td class="score min pright">{{ visitor_score }}3</td>
      <td class="min">
        <router-link :to="`/competitions/${$route.params.competitionId}/encounters/${$route.params.encounterId}/matches/${id}/update`">
          <Button><Icon type="edit" /></Button>
        </router-link>
        <router-link :to="`/matches/${id}/delete`">
          <Button level="danger"><Icon type="delete" /></Button>
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
