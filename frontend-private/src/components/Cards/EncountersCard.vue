<template>
  <Card class="encountersCard">
    <router-link :to="`encounters/${id}/matches`">
      <table>
        <tr>
          <td>Heimmannschaft: {{ data.home.name }} - {{ data.home.association.name }}</td>
          <td>Gastmannschaft: {{ data.visitor.name }} - {{ data.visitor.association.name }}</td>
          <td v-if="data.game_stage === 1">Gamestage: Finale</td>
          <td v-if="data.game_stage === 2">Gamestage: Halbfinale</td>
          <td v-if="data.game_stage === 3">Gamestage: Achtelfinale</td>
          <td v-if="data.game_stage === 4">Gamestage: Vorentscheid</td>
          <td>Datum: {{ data.datetime.format('date') }}</td>
          <td class="min">
            <router-link :to="`encounters/${id}/update`">
              <Button><Icon type="edit" /></Button>
            </router-link>&nbsp;
            <router-link :to="`encounters/${id}/delete`">
              <Button class="danger"><Icon type="delete" /></Button>
            </router-link>
          </td>
        </tr>
        <tr>
        </tr>
      </table>
    </router-link>
  </Card>
</template>

<script>
import Button from '@/components/FormElements/Button'
import Card from '@/components/Cards/Card'
import Icon from '@/components/Icons/Icon'
import { useRouter, useRoute } from 'vue-router'
import { api, setTitle, validate } from '@/helper'
import { format } from '@/helper'
import { ref } from 'vue'

export default {
  name: 'CompetitionCard',
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
  .encountersCard{
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
</style>
