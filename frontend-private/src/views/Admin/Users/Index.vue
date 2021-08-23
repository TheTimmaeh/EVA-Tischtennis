<template>
  <div class="users">
    <router-link to="/admin/users/create">
      <Button class="mb20">User anlegen</Button>
    </router-link><br />
    <MemberTable class="userTable" :members="users" path="admin/users"></MemberTable>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { api, setTitle } from '@/helper'
  import Button from '@/components/FormElements/Button'
  import MemberTable from '@/components/Tables/MemberTable'

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
  .mb20 {
    margin-bottom: 20px;
  }

  table {
    display: flex;
    flex-wrap: wrap;

    &:after {
      content: "";
      flex: auto;
    }
  }
</style>
