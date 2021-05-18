<template>
  <div>
    <input :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script>
  export default {
    name: 'InputField',
    props: {
      placeholder: {
        type: String,
        default: '',
      },
      modelValue: {
        type: String,
        default: '',
      }
    },
    emits: {
      'update:modelValue': null,
    },
    setup(props){
      return {
        ...props,
      }
    }
  }
</script>

<style lang="scss" scoped>
  input {
    border: 1px solid $color-info;
    padding: 7 9,5px;
    border-radius: 5px;
    width: 450px;
    height:38px;

    &:focus {
      outline: none !important;
      border-color: $color-info;
      box-shadow: 0 0 10px $color-info;
    }
  }
</style>
