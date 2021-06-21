<template>
  <div class="associationTeams">
    <router-link to="/associationTeams/create">
      <Button id="myButton" >Vereinsmannschaft anlegen</Button> <br>
    </router-link>
    <div class="list">Liste der Vereinsmannschaften</div>
  </div>
</template>

<script>
import { setTitle } from '@/helper'
import Button from '@/components/Button'

export default {
  name: 'assosiationsTeams',
  components: {
    Button,
  },
  setup(){
    setTitle('Vereinsmannschaften')

    return { }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
