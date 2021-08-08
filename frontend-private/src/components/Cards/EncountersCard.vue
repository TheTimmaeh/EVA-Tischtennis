<template>
  <Card class="encountersCard">
    <router-link :to="`encounters/${id}/matches`">
      <table>
        <tr>
          <td>Heimmannschaft: {{ home }}</td>
          <td>Gastmannschaft: {{ visitor }}</td>
          <td>Gamestage: {{ game_stage }}</td>
          <td>Datum: {{ datetime.format('date') }}</td>
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
import { format } from '@/helper'

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
    const route = useRoute()

    return {
      ...props.data,
    }
  },
}
</script>

<style lang="scss" scoped>
  .encountersCard{
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
</style>
