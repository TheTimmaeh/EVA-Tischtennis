<template>
  <div>
    <slot><router-view></router-view></slot>
  </div>
</template>

<script>
  export default {
    name: 'Page',
  }
</script>

<style lang="scss" scoped>
  div {
    width: 960px;
    margin: 0 auto;
  }
</style>
