<template>
  <div class="saisons">
    <router-link to="/seasons/create">
      <Button id="myButton" >Saison anlegen</Button> <br>
    </router-link>
    <div class="list">Liste zur Saisonübersicht</div>
  </div>
</template>

<script>
import { setTitle } from '@/helper'
import Button from '@/components/Button'

export default {
  name: 'Saisons',
  components: {
    Button,
  },
  setup(){
    setTitle('Saisons')

    return { }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
