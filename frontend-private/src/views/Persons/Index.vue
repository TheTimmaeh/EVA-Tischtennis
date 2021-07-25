<template>
  <div class="persons">
    <router-link to="/persons/create">
      <Button>Person anlegen</Button> <br>
    </router-link>
    <MemberTable :members="persons" path="persons"></MemberTable>
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'
import MemberTable from '@/components/Tables/MemberTable'

export default {
  name: 'Persons',
  components: {
    Button,
    MemberTable,
  },
  setup(){
    setTitle('Personen')

    const persons = ref([])

    api('/persons').then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      persons.value = res.data.map((person) => {
        return { id: person.id, name: person.name, surname: person.surname, association: 'None' }
      })
    })

    return {
      persons,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
