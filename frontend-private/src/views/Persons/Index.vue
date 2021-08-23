<template>
  <Page>
    <div class="persons">
      <router-link to="/persons/create" v-if="isAdmin">
        <Button>Person anlegen</Button> <br>
      </router-link>
      <MemberTable class="memberTable" :members="persons" path="persons" :isAdmin="isAdmin"></MemberTable>
    </div>
  </Page>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { api, setTitle } from '@/helper'
import Page from '@/components/Page'
import Button from '@/components/FormElements/Button'
import MemberTable from '@/components/Tables/MemberTable'

export default {
  name: 'Persons',
  components: {
    Page,
    Button,
    MemberTable,
  },
  setup(){
    setTitle('Personen')
    const store = useStore()
    let isAdmin = computed(() => !!store?.state?.user?.isAdmin)

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
      isAdmin,
    }
  },
}
</script>

<style lang="scss" scoped>
  .persons {
    padding-top: 20px;
  }

  .memberTable {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;

  }
</style>
