<template>
  <div>
    <input :type="type" :placeholder="placeholder" :value="modelValue" :id="label" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script>
  export default {
    name: 'InputField',
    props: {
      type: {
        type: String,
        default: 'text',
      },
      placeholder: {
        type: String,
        default: '',
      },
      modelValue: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
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
    padding: 4px 10px;
    border-radius: 5px;
    width: 450px;
    height: 38px;

    &:focus {
      outline: none !important;
      border-color: $color-info;
      box-shadow: 0 0 10px $color-info;
    }
  }
</style>
