<template>
    <Select :options="props.options" :label="props.label" :error="error" v-model="selectValue" />
</template>

<script>
  import { ref, watch } from 'vue'
  import Select from '@/components/Select'

  export default {
    name: 'GenderSelect',
    props: {
      options: {
        type: Array,
        default: [
          { value: '', text: '' },
          { value: 'female', text: 'Weiblich' },
          { value: 'male', text: 'Männlich' },
          { value: 'nonbinary', text: 'Divers' },
        ],
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
    components: {
      Select,
    },
    emits: {
      'update:modelValue': null,
    },
    setup(props, { emit }){
      const error = ref(props.error === 'true' ? true : props.error)
      const selectValue = ref('')

      watch(selectValue, () => {
        emit('update:modelValue', selectValue.value)
      })

      return {
        error,
        selectValue,
        props,
      }
    },
  }
</script>
