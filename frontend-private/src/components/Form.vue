<template>
  <form @submit.prevent="onSubmit">
    <template v-for="row in rows" :key="row.name">
      <div class="row">
        <template v-if="row.field === 'input'">
          <label :for="`l_${row.name}`">{{ row.text }}</label><InputField
          :type="row.type"
          :label="`l_${row.name}`"
          :placeholder="row.placeholder"
          :min="row.min"
          :max="row.max"
          :step="row.step"
          :minlength="row.minlength"
          :maxlength="row.maxlength"
          :ref="refs[row.name]"
          v-model="vals[row.name].value"
        /></template>
        <template v-if="row.field === 'textarea'">
          <label :for="`l_${row.name}`">{{ row.text }}</label><TextArea
          :label="`l_${row.name}`"
          :ref="refs[row.name]"
          v-model="vals[row.name].value"
        /></template>
        <template v-if="row.field === 'h2'"><h2>{{ row.text }}</h2></template>
        <template v-if="row.field === 'seasonSelect'">
          <label :for="`l_${row.name}`">{{ row.text }}</label><SeasonSelect 
          :label="`l_${row.name}`"
          :ref="refs[row.name]"
          v-model="vals[row.name].value">
          </SeasonSelect>
        </template>
        <template v-if="row.field === 'isDirector'">
          <label :for="`l_${row.name}`">{{ row.text }}</label><CheckBox 
          :label="`l_${row.name}`"
          v-model="vals[row.name].value">
          </CheckBox>
        </template>
      </div>
    </template>
    <br />
    <div class="row"><VButton class="button" /></div>
  </form>
</template>

<script>
  import { ref } from 'vue'
  import { validate } from '@/helper'
  import VButton from '@/components/VButton'
  import InputField from '@/components/InputField'
  import TextArea from '@/components/TextArea'
  import SeasonSelect from '@/components/SeasonSelect'
   import CheckBox from '@/components/CheckBox'

  export default {
    name: 'Form',
    components: {
      VButton,
      InputField,
      TextArea,
      SeasonSelect,
      CheckBox
    },
    props: {
      rows: {
        type: Object,
        required: true,
      },
    },
    emits: {
      'onValid': null,
      'onInvalid': null,
    },
    setup(props, { emit }){
      let refs = {}
      let vals = {}

      props.rows.forEach((r, i) => {
        if(r.field === 'h2') return
        refs[r.name] = ref(null)
        vals[r.name] = ref('')
      })

      const onSubmit = () => {
        let defs = Object.fromEntries(props.rows.map((r) => [r.name, r.validate]).filter((r) => r[1]))
        let valid = validate.validate({ defs, refs, vals })

        if(valid){
          let data = Object.fromEntries(Object.entries(vals).map(([k, v]) => [k, v.value]))
          emit('onValid', data)
        } else {
          emit('onInvalid')
        }
      }

      return {
        rows: props.rows,
        refs,
        vals,
        onSubmit,
      }
    },
  }
</script>

<style lang="scss" scoped>
  label {
    display: inline-block;
    width: 150px;
    text-align: left;
    margin-top: 13px;
  }

  h2 {
    text-align: left;
  }

  .row {
    text-align: left;
    margin-bottom: 10px;
  }

  .row > * {
    vertical-align: top;
  }

  .button {
    margin-left: 150px;
  }
</style>
