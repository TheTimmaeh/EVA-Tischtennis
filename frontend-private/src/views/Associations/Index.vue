<template>
  <div class="associations">
    <router-link to="/associations/create">
      <Button id="myButton" >Verein anlegen</Button> <br>
    </router-link>
    <div class="list">Liste aller Vereine</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Button from '../../components/Button'

export default {
  name: 'Associations',
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
