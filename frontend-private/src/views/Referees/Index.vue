<template>
  <div class="referees">
    <router-link to="/referees/create">
      <Button id="myButton" >Schiedsrichter anlegen</Button> <br>
    </router-link>
    <div class="list">Liste aller Schiedsrichter</div>
  </div>
</template>

<script>

import Button from '../../components/Button'

export default {
  name: 'Referees',
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
