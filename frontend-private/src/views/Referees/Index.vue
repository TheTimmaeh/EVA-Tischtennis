<template>
  <div class="referees">
    <router-link to="/referees/create">
      <Button>Schiedsrichter anlegen</Button> <br>
    </router-link>
    <div class="list">Liste aller Schiedsrichter</div>
  </div>
</template>

<script>
import { setTitle } from '@/helper'
import Button from '@/components/FormElements/Button'

export default {
  name: 'Referees',
  components: {
    Button,
  },
  setup(){
    setTitle('Schiedsrichter')

    return { }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
