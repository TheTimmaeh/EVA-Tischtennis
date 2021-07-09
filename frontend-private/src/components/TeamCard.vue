<template>
  <Card>
    <tr>
      <td>Mannschaftsname: {{nameAssociationClass}}</td>
      <td>Saison: {{season}}</td>
      <td>Spielerklasse: {{playerClass}}</td>
      <td class="min">
        <Button>Bearbeiten</Button>
      </td>
    </tr>
    <tr>
      <td>Beschreibung: {{description}}</td>
    </tr>
    <Table :content="content" :titles="titles"></Table><br />
  </Card>
</template>

<script>
 
import Button from '@/components/Button'
import Card from '@/components/Card'
import { ref } from 'vue'

export default {
  name: 'TeamCard',
  components:{
    Button,
    Card,
    },
  props: {
      data: {
        type: Object,
        required: true,
      },
      titles: [
        { id: 1, text: 'Spieler 1' },
        { id: 2, text: 'Spieler 2'},
        { id: 2, text: 'Spieler 3'},
        { id: 2, text: 'Spieler 4'},
        { id: 2, text: 'Spieler 5'},
      ],
      content: [
        { id: 1, content: [player1] },
        { id: 2, content: [player2] },
        { id: 3, content: [player3] },
        { id: 4, content: [player4] },
        { id: 5, content: [player5] },
      ],
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
