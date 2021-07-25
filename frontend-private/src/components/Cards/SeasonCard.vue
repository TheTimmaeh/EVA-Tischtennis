<template>
  <Card>
    <tr>
      <td>Saison: {{season}}</td>
      <td>Jahr: {{year}}</td>
      <td>Titel: {{title}}</td>
      <td class="min">
        <router-link :to="`/seasons/${id}/update`">
          <Button>Bearbeiten</Button>
        </router-link><br /><br />
        <router-link :to="`/seasons/${id}/delete`">
          <Button level="danger">Löschen</Button>
        </router-link>
      </td>
    </tr>
    <tr>
      <td>Beschreibung: {{description}}</td>
    </tr>
  </Card>
</template>

<script>

import Button from '@/components/FormElements/Button'
import Card from '@/components/Cards/Card'
import { ref } from 'vue'
import { api } from '@/helper'

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
  setup(props, { emit }){
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
