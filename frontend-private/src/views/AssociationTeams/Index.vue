<template>
  <div class="associationTeams">
    <router-link to="/associationTeams/create">
      <Button id="myButton" >Vereinsmannschaft anlegen</Button> <br>
    </router-link>
    <div class="list">Liste der Vereinsmannschaften</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Button from '../../components/Button'

export default {
  name: 'assosiationsTeams',
  components: { 
    Button, 
  },
  setup(){
    return { }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
