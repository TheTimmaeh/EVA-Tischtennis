<template>
  <div class="association">
    <MemberTable path="persons" :members="members"></MemberTable>
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import { useRoute } from 'vue-router'
import Button from '@/components/FormElements/Button'
import MemberTable from '@/components/Tables/MemberTable'

export default {
  name: 'AssociationsMembers',
  components: {
    Button,
    MemberTable,
  },
  setup(){
    const route = useRoute()
    setTitle(`Vereinsmitglieder | Verein ${route.params.associationId}`)

    const members = ref([])

    api(`/associations/${route.params.associationId}/members`).then((res) => res.data).then((res) => {
      console.log(res.data)
      if(!res.success){
        console.error('Fehler...', res)
        return
      }


      members.value = res.data
    })

    return {
      Button,
      MemberTable,
      members
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
