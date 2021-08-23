<template>
  <Page>
    <div class="associations">
      <router-link v-if="isAdmin" to="/associations/create">
        <Button>Verein anlegen</Button> <br>
      </router-link>
      <div class="list">
        <AssociationCard v-for="(association, index) in associations" :key="association.id" :data="association" :id="association.id" :isAdmin="isAdmin"></AssociationCard>
      </div>
    </div>
  </Page>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
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
    const store = useStore()
    let isAdmin = computed(() => !!store?.state?.user?.isAdmin)

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
      isAdmin,
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
