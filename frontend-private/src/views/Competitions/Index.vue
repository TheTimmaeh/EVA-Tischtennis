<template>
  <div class="competitions">
    <router-link to="/competitions/create">
      <Button id="myButton" >Turnier anlegen</Button> <br>
    </router-link>
    <div class="list">Liste der Turniere</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Button from '../../components/Button'

export default {
  name: 'Competitions',
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
