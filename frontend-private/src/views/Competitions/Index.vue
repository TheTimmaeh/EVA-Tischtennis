<template>
  <div class="competitions">
    <router-link to="/competitions/create">
      <Button id="myButton" >Turnier anlegen</Button> <br>
    </router-link>
    <div class="list">Liste der Turniere</div>
  </div>
</template>

<script>
import { setTitle } from '@/helper'
import Button from '@/components/Button'

export default {
  name: 'Competitions',
  components: {
    Button,
  },
  setup(){
    setTitle('Tuniere')

    return { }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
