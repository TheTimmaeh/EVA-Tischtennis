<template>
  <input :class="[ props.level, { error } ]"
    :type="props.type"
    :placeholder="props.placeholder"
    :autocomplete="props.autocomplete"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :minlength="props.minlength"
    :maxlength="props.maxlength"
    :value="modelValue"
    :id="props.label"
    @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
  import { ref, watch } from 'vue'

  export default {
    name: 'InputField',
    props: {
      type: {
        type: String,
        default: 'text',
      },
      modelValue: {
        type: [String, Number],
        default: '',
      },
      label: {
        type: String,
      },
      level: {
        type: String,
        validator: (v) => ['', 'warning', 'danger'].includes(v),
      },
      error: {
        type: [Boolean, String],
        default: false,
      },
      placeholder: {
        type: String,
      },
      autocomplete: {
        type: String,
      },
      min: {
        type: [String, Number],
      },
      max: {
        type: [String, Number],
      },
      step: {
        type: [String, Number],
      },
      minlength: {
        type: [String, Number],
      },
      maxlength: {
        type: [String, Number],
      },
    },
    emits: {
      'update:modelValue': null,
    },
    setup(props){
      const error = ref(props.error === 'true' ? true : props.error)
      const modelValue = ref('' + props.modelValue)

      if(props.type == 'date') modelValue.value = modelValue.value.substr(0, 10)

      watch(() => props.error, (err) => {
        error.value = err
      })

      return {
        props,
        error,
        modelValue,
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
    transition: box-shadow .1s;

    &:focus {
      outline: none !important;
      border-color: $color-highlight;
      box-shadow: 0 0 10px $color-highlight-light;
    }

    &.warning:focus {
      outline: none !important;
      border-color: $color-warning;
      box-shadow: 0 0 10px $color-warning;
    }

    &.danger:focus,
    &.error {
      outline: none !important;
      border-color: $color-danger;
      box-shadow: 0 0 10px $color-danger;
    }
  }
</style>
