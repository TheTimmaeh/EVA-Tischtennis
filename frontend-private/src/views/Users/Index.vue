<template>
  <div>
    <router-link to="/users/create">
      <Button>User anlegen</Button>
    </router-link><br />
    <MemberTable :members="users"></MemberTable>
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Button from '@/components/Button'
import MemberTable from '@/components/MemberTable'

export default {
  name: 'Users',
  components: {
    Button,
    MemberTable,
  },
  setup(){
    setTitle('Users')

    const users = ref([])

    api('/users').then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', data)
        return
      }

      users.value = res.data.map((user) => {
        return { id: user.id, name: `User #${user.id}`, surname: user.username, association: user.isAdmin ? 'Admin' : 'Schiri' }
      })
    })

    return {
      users,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
