<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Card',
  }
</script>

<style lang="scss" scoped>
  div {
    background-color: white;
    color: $color-dark-text;
    padding: 10px 25px;
    text-align: left;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    border: 2px solid $color-info;
    border-radius: 5px;
    // margin: 8px;
    overflow: hidden;
    position: relative;

    &.warning {
      background-color: $color-warning;
      color: $color-dark-text;
    }

    &.danger {
      background-color: $color-danger;
    }

    &:hover {
      box-shadow: 0 4px 4px 0 $color-info;
    }
  }
</style>
