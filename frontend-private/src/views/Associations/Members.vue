<template>
  <div class="association">
    <MemberTable path="persons" :members="members" :loggedIn="loggedIn"></MemberTable>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { api, setTitle } from '@/helper'
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
    const store = useStore()
    let loggedIn = computed(() => !!store?.state?.user?.username)

    const members = ref([])

    api(`/associations/${route.params.associationId}/members`).then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }


      members.value = res.data
    })

    return {
      Button,
      MemberTable,
      members,
      loggedIn,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
