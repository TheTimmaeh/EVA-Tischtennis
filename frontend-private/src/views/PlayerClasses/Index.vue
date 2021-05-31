<template>
  <div class="playerClasses">
    <router-link to="/playerClasses/create">
      <Button id="myButton" >Spielerklass anlegen</Button> <br>
    </router-link>
    <div class="list">Liste der Spielerklassen</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Button from '../../components/Button'

export default {
  name: 'PlayerClasses',
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
