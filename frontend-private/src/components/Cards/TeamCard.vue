<template>
  <Card>
    <!-- <router-link :to="`/associations/${$route.params.associationId}/teams/${id}/members`"> -->
      <table>
        <th>Mannschaft: {{ data.name }}</th>
        <tr>
          <td>Saison: {{ data.season }}</td>
        </tr>
        <tr>
          <td>Spielerklasse: {{ data.playerClass }} <br> </td>
        </tr>
        <tr>
        <td>
        <table class="lineup">
        <th>Mannschaftsaufstellung</th>
        <tr v-for="(member, index) in teamMembers" :key="member.id"> 
          <td v-if="member.id">Position {{ member.position }} : {{ member.name }} {{ member.surname }}</td>
        </tr>
        </table><br>
        </td>
        </tr>
        <tr>
          <td >
            <router-link :to="`/associations/${$route.params.associationId}/teams/${data.id }/members/update`">
              <Button>Mannschaftsaufstellung ändern</Button> 
            </router-link>
          </td>
          <td class="min">
            <router-link :to="`/associations/${$route.params.associationId}/teams/${data.id }/update`">
            <Button><Icon type="edit" /></Button> 
            </router-link>
          </td>
          <td class="min">
            <router-link :to="`/associations/${$route.params.associationId}/teams/${data.id }/delete`">
              <Button level="danger"><Icon type="delete" /></Button>
            </router-link>
          </td>
        </tr>  
      </table>
    <!-- </router-link> -->
  </Card>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { api, setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'
import Card from '@/components/Cards/Card'
import Icon from '@/components/Icons/Icon'


export default {
  name: 'TeamCard',
  components: {
    Button,
    Card,
    Icon,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props){
    const route = useRoute()
    const teamMembers = ref([])

    api(`/associations/${route.params.associationId}/teams/${props.data.id}/members`).then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }
       
      teamMembers.value = res.data
    })

    return {
      ...props,
      teamMembers,
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
table{
  margin:  10px 0px;
}
</style>
