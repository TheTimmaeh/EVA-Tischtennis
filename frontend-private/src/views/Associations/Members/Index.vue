<template>
  <div class="members">
    Ich bin immernoch im Verein {{ $route.params.associationId }}
    <router-link :to="`/associatons/${$route.params.associationId}/teams/${$route.params.team}/members/create`">
      <Button id="myButton" >Vereinsmitglied anlegen</Button> <br>
    </router-link>
    <MemberTable :members="members"></MemberTable>
  </div>
</template>

<script>
import { setTitle } from '@/helper'
import Button from '@/components/Button'
import MemberTable from '@/components/MemberTable'

export default {
  name: 'Members',
  components: {
    Button,
    MemberTable,
  },
  setup(){
    setTitle('Vereinsmitglieder')

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
