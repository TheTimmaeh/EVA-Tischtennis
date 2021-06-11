<template>
    <Card>
      <tr>
        <td>{{name}}</td>
        <td>{{age}}</td>
        <td>{{gender}}</td>
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
  name: 'PlayerClassCard',
  components:{
    Button,
    Card,
    },
  setup(){
    let name = ref('Spielerklassenname')
    let age = ref('Alter')
    let gender = ref('Geschlecht')

    return {
      name,
      age,
      gender
    }
  },
}
</script>

<style lang="scss" scoped>
td{
    text-align: inherit;
    display: table-cell;
    width: 30em;
}
tr{
    text-align: inherit;
}
.min {
    width: 1%;
    white-space: nowrap;
}
</style>
