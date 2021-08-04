<template>
  <Page>  
    <div class="users">
      <router-link to="/admin/users/create">
        <Button>User anlegen</Button>
      </router-link><br />
      <MemberTable class="userTable" :members="users" path="admin/users"></MemberTable>
    </div>
  </Page>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Page from '@/components/Page'
import Button from '@/components/FormElements/Button'
import MemberTable from '@/components/Tables/MemberTable'

export default {
  name: 'Users',
  components: {
    Page,
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
 .users {
    padding-top: 20px;
  }

  .userTable{
    margin-top: 20px;
  }

  table {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;

    &:after {
      content: "";
      flex: auto;
    }
  }
</style>
