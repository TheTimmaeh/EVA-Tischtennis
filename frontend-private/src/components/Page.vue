<template>
  <div :class="{ padding }">
    <slot><router-view></router-view></slot>
  </div>
</template>

<script>
  export default {
    name: 'Page',
    props: {
      padding: {
        type: Boolean,
        default: true,
      },
    },
    setup(props){
      return {
        padding: props.padding,
      }
    },
  }
</script>

<style lang="scss" scoped>
  div {
    width: 960px;
    margin: 0 auto;

    &.padding {
      padding-top: 20px;
    }
  }
</style>
