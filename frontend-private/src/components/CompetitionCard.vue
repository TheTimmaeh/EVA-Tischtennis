<template>
  <Card>
    <tr>
      <td>Name: {{name}}</td>
      <td>Start-Datum: {{startdate}}</td>
      <td>End-Datum: {{enddate}}</td>
      <td>Spielerklasse: {{class}}</td>
      <td class="min">
        <Button>Bearbeiten</Button>
      </td>
    </tr>
    <tr>
      <td>Anschrift: {{street}} {{streetnumber}}, {{zipcode}} {{city}}, {{starte}}, {{country}}</td>
    </tr>
    <tr>
      <td>Kontakt: Telefonnummer: {{telefon}}, Mail-Adresse: {{mail}}, Website {{webiste}}</td>
    </tr>
  </Card>
</template>

<script>

import Button from '@/components/Button'
import Card from '@/components/Card'
import { ref } from 'vue'

export default {
  name: 'CompetitionCard',
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
