<template>
  <div class="members">
    <router-link to="/members/create">
      <Button id="myButton" >Vereinsmitglied anlegen</Button> <br>
    </router-link>
    <MemberTable :members="members"></MemberTable>
  </div>
</template>

<script>
import { ref } from 'vue'
import Button from '@/components/Button'
import MemberTable from '@/components/MemberTable'

export default {
  name: 'Members',
  components: {
    Button,
    MemberTable,
  },
  setup(){
    return {
      members: [
        { id: 1, name: 'Tim', surname: 'Elbert', association: 'Mannschaft 1' },
        { id: 2, name: 'Tina', surname: 'Hänsel', association: 'Mannschaft 2' },
        { id: 3, name: 'Daniel', surname: 'Wallner', association: 'Mannschaft 3' },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
