<template>
  <Card>
    <tr>
      <td>Spieler: {{season}}</td>
      <td>Verein: {{year}}</td>
      <td class="min">
        <Button>Bearbeiten</Button>
      </td>
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
  setup(){
    let season = ref('Saison konnte nicht geladen werden')
    let year = ref('Jahr konnte nicht geladen werden')

    return {
      season,
      year,
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
