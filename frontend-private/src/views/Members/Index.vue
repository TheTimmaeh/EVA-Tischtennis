<template>
  <div class="members">
    <router-link to="/members/create">
      <Button id="myButton" >Vereinsitglied anlegen</Button> <br>
    </router-link>
    <div class="list">Liste aller Vereinsitglieder</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Button from '../../components/Button'

export default {
  name: 'Members',
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
