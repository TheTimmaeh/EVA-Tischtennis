<template>
  <div class="association">
    <router-link :to="`/associations/${$route.params.id}/members`">Mitglieder</router-link>
    <router-link :to="`/associations/${$route.params.id}/teams`">Mannschaften</router-link>

    {{ $route.params.id }}<br /><br />
    

    <router-link :to="`/associations/${$route.params.id}/teams/Create`">
      <Button id="myButton" >Team anlegen</Button> <br>
    </router-link><br/>
    <router-link :to="`/associations/${$route.params.id}/members/Create`">
      <Button id="myButton" >Mitglied anlegen</Button> <br>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import { api, setTitle } from '@/helper'
import Button from '@/components/Button'

export default {
  name: 'Associations',
  components: {
    Button,
  },
  setup(){
    setTitle('Verein')

    return {
      Button,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
