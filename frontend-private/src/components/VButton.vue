<template>
  <button :class="{ warning: level === 'warning', danger: level === 'danger' }" @click="$emit('action')"><slot /></button>
</template>

<script>
  export default {
    name: 'VButton',
    props: {
      level: {
        type: String,
        default: 'none',
      },
    },
    emits: {
      action: null,
    },
    setup(props){
      return {
        ...props,
      }
    }
  }
</script>

<style lang="scss" scoped>
  button {
    background-color: $color-primary;
    border: none;
    color: white;
    padding: 10px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;

    &:hover, &:focus {
      outline: none !important;
      border-color: $color-info;
      box-shadow: 0 0 10px $color-info;
    }

    &.warning {
      background-color: $color-warning;
      color: $color-dark-text;
    }

    &.danger {
      background-color: $color-danger;
    }
  }
</style>
