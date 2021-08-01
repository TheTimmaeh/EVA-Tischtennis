<template>
  <Page>
    <div class="associations">
      <router-link to="/associations/create">
        <Button>Verein anlegen</Button> <br>
      </router-link>
      <div class="list">
        <AssociationCard v-for="(association, index) in associations" :key="association.id" :data="association" :id="association.id"></AssociationCard>
      </div>
    </div>
  </Page>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Page from '@/components/Page'
import Button from '@/components/FormElements/Button'
import AssociationCard from '@/components/Cards/AssociationCard'

export default {
  name: 'Associations',
  components: {
    Page,
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
  .associations {
    padding-top: 20px;
  }

  .list {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;

    &:after {
      content: "";
      flex: auto;
    }
  }
</style>
