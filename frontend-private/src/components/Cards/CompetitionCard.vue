<template>
  <Card>
    <tr>
      <td>Name: {{name}}</td>
      <!-- <td>Start-Datum: {{startdate}}</td>
      <td>End-Datum: {{enddate}}</td> -->
      <td>Spielerklasse: {{player_class}}</td>
      <td class="min">
        <router-link :to="`/competitions/${id}/update`">
          <Button>Bearbeiten</Button> <br>
      </router-link><br/>
      </td>
    </tr>
    <tr>
      <td>
       <router-link :to="`/competitions/${id}/encounters/create`">
          <Button>Begegnung anlegen</Button> <br>
       </router-link><br/>
      </td>
      <td>
       <router-link :to="`/competitions/${id}/encounters`">
          <Button>Begegnungen anzeigen</Button> <br>
       </router-link><br/>
      </td>
    </tr>
    <!-- <tr>
      <td>Anschrift: {{street}} {{streetnumber}}, {{zipcode}} {{city}}, {{starte}}, {{country}}</td>
    </tr>
    <tr>
      <td>Kontakt: Telefonnummer: {{telefon}}, Mail-Adresse: {{mail}}, Website {{webiste}}</td>
    </tr>
   <tr v-for="team in teams" :key="team.id">
      <td>Mannschaft: {{mannschaft}}, Verein: {{verein}}, <Button>Bearbeiten</Button></td>
    </tr> -->
  </Card>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { api, setTitle, validate } from '@/helper'
import Button from '@/components/FormElements/Button'
import Card from '@/components/Cards/Card'
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
