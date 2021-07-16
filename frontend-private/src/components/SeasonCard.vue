<template>
  <Card>
    <tr>
      <td>Saison: {{season}}</td>
      <td>Jahr: {{year}}</td>
      <td>Titel: {{title}}</td>
      <td class="min">
        <router-link :to="`/season/${id}/update`">
          <Button>Bearbeiten</Button> <br>
        </router-link><br/>

      </td>
    </tr>
    <tr>
      <td>Beschreibung: {{description}}</td>
    </tr>
  </Card>
</template>

<script>

import Button from '@/components/Button'
import Card from '@/components/Card'
import { ref } from 'vue'

export default {
  name: 'SeasonCard',
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
