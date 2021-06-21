<template>
    <Select :options="props.options" :label="props.label" :error="error" v-model="selectValue" />
</template>

<script>
  import { ref, watch } from 'vue'
  import Select from '@/components/Select'

  export default {
    name: 'StateSelect',
    props: {
      options: {
        type: Array, // DE states
        default: [
          { value: '', text: '' },
          { value: 'BW', text: 'Baden-Württemberg' },
          { value: 'BY', text: 'Bayern' },
          { value: 'BE', text: 'Berlin' },
          { value: 'BB', text: 'Brandenburg' },
          { value: 'HB', text: 'Bremen' },
          { value: 'HH', text: 'Hamburg' },
          { value: 'HE', text: 'Hessen' },
          { value: 'MV', text: 'Mecklenburg-Vorpommern' },
          { value: 'NI', text: 'Niedersachsen' },
          { value: 'NW', text: 'Nordrhein-Westfalen' },
          { value: 'RP', text: 'Rheinland-Pfalz' },
          { value: 'SL', text: 'Saarland' },
          { value: 'SN', text: 'Sachsen' },
          { value: 'ST', text: 'Sachsen-Anhalt' },
          { value: 'SH', text: 'Schleswig-Holstein' },
          { value: 'TH', text: 'Thüringen' },
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
