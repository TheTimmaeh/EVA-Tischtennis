<template>
  <input
    type="checkbox"
    :id="props.label"
    :value="props.returnValue"
    :checked="props.modelValue === props.returnValue"
    @input="$emit('update:modelValue', $event.target.checked ? props.returnValue : null)"
  />
</template>

<script>
  export default {
    name: 'CheckBox',
    props: {
      modelValue: {
        type: String,
        default: null,
      },
      label: {
        type: String,
        default: '',
      },
      returnValue: {
        type: String,
        default: 'true',
      }
    },
    emits: {
      'update:modelValue': null,
    },
    setup(props){
      return {
        props,
        checked: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  input {
    height: 30px;
    width: 30px;
    margin: 5px 0;
    border: 1px solid $color-info;
  }
</style>
