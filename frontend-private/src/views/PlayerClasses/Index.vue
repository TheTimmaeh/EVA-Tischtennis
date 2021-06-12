<template>
  <div class="playerClasses">
    <router-link to="/playerClasses/create">
      <Button id="myButton" >Spielerklasse anlegen</Button> <br>
    </router-link>
    <div class="list">Liste der Spielerklassen</div>
  </div>
</template>

<script>
import { setTitle } from '@/helper'
import Button from '@/components/Button'

export default {
  name: 'PlayerClasses',
  components: {
    Button,
  },
  setup(){
    setTitle('Spielerklassen')
    return { }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
