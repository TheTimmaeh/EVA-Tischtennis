<template>
  <input :class="[ props.level ]" :type="props.type" :placeholder="props.placeholder" :value="props.modelValue" :id="props.label" @input="$emit('update:modelValue', $event.target.value)" />
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
      level: {
        type: String,
        validator: (v) => ['', 'warning', 'danger'].includes(v),
      },
    },
    emits: {
      'update:modelValue': null,
    },
    setup(props){
      return {
        props,
      }
    }
  }
</script>

<style lang="scss" scoped>
  input {
    border: 1px solid $color-info;
    padding: 12px 10px;
    border-radius: 5px;
    width: 450px;
    // height: 38px;

    &:focus {
      outline: none !important;
      border-color: $color-info;
      box-shadow: 0 0 10px $color-info;
    }

    // &:focus {
    //   outline: none !important;
    //   border-color: $color-highlight;
    //   box-shadow: 0 0 10px $color-highlight-light;
    // }

    &.warning:focus {
      outline: none !important;
      border-color: $color-warning;
      box-shadow: 0 0 10px $color-warning;
    }

    &.danger:focus {
      outline: none !important;
      border-color: $color-danger;
      box-shadow: 0 0 10px $color-danger;
    }
  }
</style>
