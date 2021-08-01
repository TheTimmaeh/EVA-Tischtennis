<template>
  <button :class="[ 'btn', { hasText }, props.level ]" @click="$emit('action')"><slot>Submit</slot></button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      level: {
        type: String,
        validator: (v) => ['warning', 'danger'].includes(v),
      },
    },
    emits: {
      action: null,
    },
    setup(props, { slots }){
      let hasText = false

      if(typeof slots?.default === 'function'){
        hasText = !!slots.default()?.find((s) => s.type?.description === 'Text')
      }

      return {
        props,
        hasText,
      }
    }
  }
</script>

<style lang="scss">
  button.btn {
    background-color: $color-primary;
    border: none;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    line-height: 16px;
    height: 36px;
    min-width: 36px;
    border-radius: 5px;
    cursor: pointer;
    white-space: nowrap;

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

    & > svg {
      margin: 0 4px;
      transform: scale(1.4);
    }

    &.hasText > svg {
      margin: 0 12px 0 4px;
    }
  }
</style>
