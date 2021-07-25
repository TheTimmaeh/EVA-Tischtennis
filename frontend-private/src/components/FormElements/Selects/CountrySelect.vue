<template>
    <Select :options="props.options" :label="props.label" :error="error" v-model="selectValue" />
</template>

<script>
  import { ref, watch } from 'vue'
  import Select from '@/components/FormElements/Selects/Select'

  export default {
    name: 'CountrySelect',
    props: {
      options: {
        type: Array, // EU members
        default: [
          { value: '', text: '' },
          { value: 'AT', text: 'Österreich' },
          { value: 'BE', text: 'Belgien' },
          { value: 'BG', text: 'Bulgarien' },
          { value: 'CY', text: 'Zypern' },
          { value: 'CZ', text: 'Tschechien' },
          { value: 'DE', text: 'Deutschland' },
          { value: 'DK', text: 'Dänemark' },
          { value: 'EE', text: 'Estland' },
          { value: 'ES', text: 'Spanien' },
          { value: 'FI', text: 'Finnland' },
          { value: 'FR', text: 'Frankreich' },
          { value: 'GR', text: 'Griechenland' },
          { value: 'HR', text: 'Kroatien' },
          { value: 'HU', text: 'Ungarn' },
          { value: 'IE', text: 'Irland' },
          { value: 'IT', text: 'Italien' },
          { value: 'LT', text: 'Litauen' },
          { value: 'LU', text: 'Luxemburg' },
          { value: 'LV', text: 'Lettland' },
          { value: 'MT', text: 'Malta' },
          { value: 'NL', text: 'Niederlande' },
          { value: 'PL', text: 'Polen' },
          { value: 'PT', text: 'Portugal' },
          { value: 'RO', text: 'Rumänien' },
          { value: 'SE', text: 'Schweden' },
          { value: 'SI', text: 'Slowenien' },
          { value: 'SK', text: 'Slowakei' },
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
