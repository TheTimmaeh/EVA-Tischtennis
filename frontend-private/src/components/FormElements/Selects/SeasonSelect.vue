<template>
    <Select :options="props.options" :label="props.label" :error="error" v-model="selectValue" />
</template>

<script>
  import { ref, watch } from 'vue'
  import Select from '@/components/FormElements/Selects/Select'

  export default {
    name: 'SeasonSelect',
    props: {
      options: {
        type: Array,
        default: [
          { value: '', text: '' },
          { value: 'wi', text: 'Winter' },
          { value: 'su', text: 'Sommer' },
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
      const selectValue = ref(props.modelValue || '')

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
