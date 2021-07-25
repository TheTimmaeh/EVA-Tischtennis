<template>
    <select :class="{ error }" :id="props.label" @input="$emit('update:modelValue', $event.target.value)">
      <option v-for="option in props.options" :key="option.value" :value="option.value" :selected="option.value === props.modelValue">{{ option.text }}</option>
    </select>
</template>

<script>
  import { ref, watch } from 'vue'

  export default {
    name: 'Select',
    props: {
      options: {
        type: Array,
        default: [ ],
      },
      label: {
        type: String,
        default: '',
      },
      modelValue: {
        type: String,
        default: '',
      },
      error: {
        type: [Boolean, String],
        default: false,
      },
    },
    emits: {
      'update:modelValue': null,
    },
    setup(props){
      const error = ref(props.error === 'true' ? true : props.error)

      watch(() => props.error, (err) => {
        error.value = err
      })

      return {
        props,
        error,
      }
    },
  }
</script>

<style lang="scss" scoped>
  select {
    border: 1px solid $color-info;
    padding: 12px 8px;
    border-radius: 5px;
    width: 450px;
    transition: box-shadow .1s;
    height: 41px;

    &:focus {
      outline: none !important;
      border-color: $color-info;
      box-shadow: 0 0 10px $color-info;
    }

    &.error {
      outline: none !important;
      border-color: $color-danger;
      box-shadow: 0 0 10px $color-danger;
    }
  }
</style>
