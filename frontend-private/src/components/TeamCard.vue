<template>
  <Card>
    <table>
      <tr>
        <td>Mannschaftsname: {{ name }}</td>
        <td>Saison: {{ season }}</td>
        <td>Spielerklasse: {{ playerClass }}</td>
        <td class="min">
          <router-link :to="`/associations/${$route.params.associationId}/teams/${id}/update`">
          <Button>Bearbeiten</Button> <br>
          </router-link><br/>
        </td>
      </tr>
      <!-- <tr>
        <td>Beschreibung: {{ description }}</td>
      </tr> -->
      <tr>
        <td class="min">
          <router-link :to="`/associations/${$route.params.associationId}/teams/${id}/lineup`">
          <Button>Mannschaftsaufstellung einsehen</Button> <br>
          </router-link><br/>
        </td>
        <td class="min">
          <router-link :to="`/associations/${$route.params.associationId}/teams/${id}/lineupcreate`">
          <Button>Mannschaftsaufstellung einpflegen</Button> <br>
          </router-link><br/>
        </td>
        <td class="min">
          <router-link :to="`/associations/${$route.params.associationId}/teams/${id}/lineupupdate`">
          <Button>Mannschaftsaufstellung ändern</Button> <br>
          </router-link><br/>
        </td>
      </tr>
    </table>
    <Table :content="content" :titles="titles"></Table><br />
  </Card>
</template>

<script>

import Button from '@/components/Button'
import Card from '@/components/Card'
import { ref } from 'vue'

export default {
  name: 'TeamCard',
  components: {
    Button,
    Card,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    titles: {
      type: Array,
      default: [
        { id: 1, text: 'Spieler 1' },
        { id: 2, text: 'Spieler 2' },
        { id: 3, text: 'Spieler 3' },
        { id: 4, text: 'Spieler 4' },
        { id: 5, text: 'Spieler 5' },
      ]
    },
    content: {
      type: Array,
      default: []
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
