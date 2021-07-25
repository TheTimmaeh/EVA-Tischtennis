<template>
  <div class="associations">
    <router-link to="/associations/create">
      <Button>Verein anlegen</Button> <br>
    </router-link>
    <div class="list">
      <AssociationCard v-for="(association, index) in associations" :key="association.id" :data="association"></AssociationCard>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'
import AssociationCard from '@/components/Cards/AssociationCard'

export default {
  name: 'Associations',
  components: {
    Button,
    AssociationCard,
  },
  setup(){
    setTitle('Vereine')

    const associations = ref([])

    api('/associations').then((res) => res.data).then((res) => {

      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      associations.value = res.data
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
