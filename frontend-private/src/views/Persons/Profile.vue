<template>
  <Page>
    <div class="person">
      <PersonCard :data="person"></PersonCard>
    </div>
  </Page>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import { useRoute } from 'vue-router'
import Page from '@/components/Page'
import Button from '@/components/FormElements/Button'
import PersonCard from '@/components/Cards/PersonCard'

export default {
  name: 'Associations',
  components: {
    Page,
    Button,
    PersonCard,
  },
  setup(){
    const route = useRoute()
    setTitle('Deteilansicht Person')

    const person = ref([])

    api(`/persons/${route.params.personId}`).then((res) => res.data).then((res) => {

      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      person.value = res.data
    })

    return {
      person,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
