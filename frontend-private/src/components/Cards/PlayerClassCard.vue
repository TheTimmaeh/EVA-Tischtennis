<template>
    <Card>
      <tr>
        <td>Name: {{name}}</td>
        <td>Von: {{age_from}} Jahren</td>
        <td>Bis: {{age_to}} Jahren</td>
        <td>Geschlecht: {{gender}}</td>
        <td class="min">
          <router-link :to="`/admin/playerClasses/${id}/update`">
            <Button><Icon type="edit" /></Button> <br>
          </router-link><br/>
          <router-link :to="`/admin/playerClasses/${id}/delete`">
            <Button level="danger"><Icon type="delete" /></Button>
          </router-link>
        </td>
      </tr>
     </Card>
</template>

<script>
import { computed } from 'vue'
import Button from '@/components/FormElements/Button'
import Card from '@/components/Cards/Card'
import Icon from '@/components/Icons/Icon'
import { ref } from 'vue'

export default {
  name: 'PlayerClassCard',
  components:{
    Button,
    Card,
    Icon,
    },
    props: {
      playerClass: {
        type: Object,
        required: true,
      },
    },
    setup(props){
      const playerClass = computed(() => props.playerClass)

      return {
        ...props.playerClass,
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
