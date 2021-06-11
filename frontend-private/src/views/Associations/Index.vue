<template>
  <div class="associations">
    <router-link to="/associations/create">
      <Button id="myButton" >Verein anlegen</Button> <br>
    </router-link>
    <div class="list">
      <AssociationCard  v-for="(association, index) in associations" :key="association.id" :data="association"></AssociationCard>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { axios } from '@/helper'
import { ref } from 'vue'
import Button from '../../components/Button'
import AssociationCard from '../../components/AssociationCard'

export default {
  name: 'Associations',
  components: { 
    Button, 
    AssociationCard,
  },
   props: {
      associations: {
        type: Array,
      },
    },
  setup(props){
    const associations = computed(() => props.associations)

    axios().get('/associations').then((res) => res.data).then((res) => {

      if(!res.success){
        console.error('Fehler...', data)
        return
      }

      associations.value = res.data
      
    }).catch((err) => {
      console.error(err)
    })

    return {
        associations,
     }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
