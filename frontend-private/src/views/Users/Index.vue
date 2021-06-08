<template>
  <div>
    <router-link to="/users/create">
      <Button>User anlegen</Button>
    </router-link><br />
    <MemberTable :key="forceRender" :members="users"></MemberTable>
  </div>
</template>

<script>
import { ref } from 'vue'
import { axios } from '@/helper'
import Button from '@/components/Button'
import MemberTable from '@/components/MemberTable'

export default {
  name: 'Users',
  components: {
    Button,
    MemberTable,
  },
  setup(){
    const forceRender = ref(0)
    const users = ref([])

    axios().get('/users').then((res) => res.data).then((res) => {

      if(!res.success){
        console.error('Fehler...', data)
        return
      }

      users.value = res.data.map((user) => {
        return { id: user.id, name: `User #${user.id}`, surname: user.username, association: user.isAdmin ? 'Admin' : 'Schiri' }
      })

      forceRender.value++
    }).catch((err) => {
      console.error(err)
    })

    return {
      forceRender,
      users,
    }
  },
}
</script>

<style lang="scss" scoped>
  .list {
    padding: 20px;
  }
</style>
