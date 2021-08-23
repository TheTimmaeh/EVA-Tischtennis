<template>
  <Page>
    <div class="home">
      EVA Tischtennis
    </div>
  </Page>
</template>

<script>
import { setTitle } from '@/helper'
import Page from '@/components/Page'

export default {
  name: 'Home',
  components: {
    Page,
  },
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
