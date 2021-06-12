<template>
  <div class="persons">
    <router-link to="/persons/create">
      <Button id="myButton" >Person anlegen</Button> <br>
    </router-link>
    <div class="list">Liste aller Personen</div>
  </div>
</template>

<script>
import { setTitle } from '@/helper'
import Button from '@/components/Button'

export default {
  name: 'Persons',
  components: {
    Button,
  },
  setup(){
    setTitle('Personen')

    return { }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
