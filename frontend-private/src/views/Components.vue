<template>
  <div class="components">
    <h2>Buttons</h2>
    <VButton class="button">Einfacher Button</VButton>
    <VButton class="button" @action="clicked++">Einfacher Button mit Action ({{ clicked }}x geklickt)</VButton>
    <VButton class="button" level="danger">Button mit Level <strong>danger</strong></VButton>
    <VButton class="button" level="warning">Button mit Level <strong>warning</strong></VButton>
    <br /><br />
    <h2>Inputs</h2>
    <InputField placeholder="Platzhaltertext..." v-model="forminput" /> Eingabe: {{ forminput }}
  </div>
</template>

<script>
import { ref } from 'vue'
import VButton from '@/components/VButton'
import InputField from '@/components/InputField'

export default {
  name: 'Components',
  components: {
    VButton,
    InputField,
  },
  setup(){
    let clicked = ref(0)
    let forminput = ref('')

    return {
      clicked,
      forminput,
    }
  },
}
</script>

<style lang="scss" scoped>
  .button {
    margin: 0 4px;
  }
</style>
