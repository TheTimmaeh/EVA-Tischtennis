<template>
  <Card>
    <!-- <router-link :to="`/associations/${$route.params.associationId}/teams/${id}/members`"> -->
      <table>
        <tr>
          <td>Mannschaftsname: {{ name }}</td>
          <td>Saison: {{ season }}</td>
          <td>Spielerklasse: {{ playerClass }}</td>
          <td class="min">
            <router-link :to="`/associations/${$route.params.associationId}/teams/${id}/update`">
            <Button>Bearbeiten</Button> <br>
            </router-link><br/>
            <router-link :to="`/associations/${$route.params.associationId}/teams/${id}/members/update`">
              <Button>Mannschaftsaufstellung ändern</Button> <br>
            </router-link>
          </td>
        </tr>
      </table>
    <!-- </router-link> -->
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
