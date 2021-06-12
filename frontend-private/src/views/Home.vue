<template>
  <div class="home">
    EVA Tischtennis
  </div>
</template>

<script>
import { setTitle } from '@/helper'

export default {
  name: 'Home',
  setup(){
    setTitle('Home')
    return { }
  },
}
</script>

<style lang="scss" scoped>
  .home {
    background-color: $color-fade-grey;
  }
</style>
