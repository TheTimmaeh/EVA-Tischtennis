<template>
  <Card>
    <tr>
      <td>Heimmannschaft: {{ home }}</td>
      <td>Gastmannschaft: {{ visitor }}</td>
      <td>Gamestage: {{ game_stage }}</td>
      <td>Datum: {{ datetime.format('date') }}</td>
      <td class="min">
        <router-link :to="`encounters/${id}/update`">
          <Button><Icon type="edit" /></Button> <br>
        </router-link><br/>
        <router-link :to="`encounters/${id}/delete`">
          <Button class="danger"><Icon type="delete" /></Button> <br>
        </router-link><br/>
      </td>
    </tr>
      <td>
       <router-link :to="`encounters/${id}/matches`">
        <Button>Spiele</Button> <br>
       </router-link><br/>
      </td>
    <tr>
    </tr>
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
