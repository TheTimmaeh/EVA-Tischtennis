<template>
  <div class="components">
    <h2>Buttons</h2>
    <VButton class="button">Einfacher Button</VButton>
    <VButton class="button" @action="clicked++">Einfacher Button mit Action ({{ clicked }}x geklickt)</VButton>
    <VButton class="button" level="danger">Button mit Level <strong>danger</strong></VButton>
    <VButton class="button" level="warning">Button mit Level <strong>warning</strong></VButton>
    <VButton class="button"></VButton>
    <br /><br />
    <h2>Inputs</h2>
    <label for="input1">Input 1:</label><InputField label="input1" placeholder="Text Input" v-model="input1" /><br />
    Eingabe: <pre>{{ input1 }}</pre><br />
    <label for="input2">Input 2:</label><InputField type="password" label="input2" placeholder="Password Input" level="warning" /><br />
    <label for="input3">Input 3:</label><InputField type="number" label="input3" placeholder="Number Input" level="danger" /><br />
    <br /><br />
    <h2>TextArea</h2>
    <label for="textarea1">Textarea 1:</label><TextArea label="textarea1" placeholder="Textarea Input" v-model="input2" /><br />
    Eingabe: <pre>{{ input2 }}</pre><br />
    <label for="textarea2">Textarea 2:</label><TextArea label="textarea2" level="warning" :modelValue="beispieltext" /><br />
    <label for="textarea1">Textarea 3:</label><TextArea label="textarea3" level="danger" autoresize="false" />
  </div>
</template>

<script>
import { ref } from 'vue'
import VButton from '@/components/VButton'
import InputField from '@/components/InputField'
import TextArea from '@/components/TextArea'

export default {
  name: 'Components',
  components: {
    VButton,
    InputField,
    TextArea,
  },
  setup(){
    let clicked = ref(0)
    let input1 = ref('')
    let input2 = ref('')

    return {
      clicked,
      input1,
      input2,
      beispieltext: `Dies
ist
ein
Beispieltext`,
    }
  },
}
</script>

<style lang="scss" scoped>
  .button {
    margin: 0 4px;
  }
</style>
