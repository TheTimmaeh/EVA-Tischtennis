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
        <template v-if="row.field === 'search'">
          <label :for="`l_${row.name}`">{{ row.text }}</label><SearchField
          :label="`l_${row.name}`"
          :placeholder="row.placeholder"
          :apiPath="row.apiPath"
          :displayFormat="row.displayFormat"
          :returnPath="row.returnPath"
          :lookupRow="row.lookupRow"
          :limit="row.limit"
          :delay="row.delay"
          :displayValue="row.displayValue"
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
        <template v-if="row.field === 'countrySelect'">
          <label :for="`l_${row.name}`">{{ row.text }}</label><CountrySelect
          :label="`l_${row.name}`"
          :ref="refs[row.name]"
          v-model="vals[row.name].value">
          </CountrySelect>
        </template>
        <template v-if="row.field === 'stateSelect'">
          <label :for="`l_${row.name}`">{{ row.text }}</label><StateSelect
          :label="`l_${row.name}`"
          :ref="refs[row.name]"
          v-model="vals[row.name].value">
          </StateSelect>
        </template>
        <template v-if="row.field === 'genderSelect'">
          <label :for="`l_${row.name}`">{{ row.text }}</label><GenderSelect
          :label="`l_${row.name}`"
          :ref="refs[row.name]"
          v-model="vals[row.name].value">
          </GenderSelect>
        </template>
        <template v-if="row.field === 'checkbox'">
          <label :for="`l_${row.name}`">{{ row.text }}</label><CheckBox
          :label="`l_${row.name}`"
          :returnValue="row.returnValue"
          :checked ="row.checked"
          v-model="vals[row.name].value">
          </CheckBox>
        </template>
        <template v-if="row.field === 'gameStageSelect'">
          <label :for="`l_${row.name}`">{{ row.text }}</label><GameStageSelect
          :label="`l_${row.name}`"
          :ref="refs[row.name]"
          v-model="vals[row.name].value">
          </GameStageSelect>
        </template>
      </div>
    </template>
    <br />
    <div class="row"><Button class="button" /></div>
  </form>
</template>

<script>
  import { ref } from 'vue'
  import { validate } from '@/helper'
  import Button from '@/components/FormElements/Button'
  import InputField from '@/components/FormElements/InputField'
  import SearchField from '@/components/FormElements/SearchField'
  import TextArea from '@/components/FormElements/TextArea'
  import SeasonSelect from '@/components/FormElements/Selects/SeasonSelect'
  import CountrySelect from '@/components/FormElements/Selects/CountrySelect'
  import StateSelect from '@/components/FormElements/Selects/StateSelect'
  import GenderSelect from '@/components/FormElements/Selects/GenderSelect'
  import GameStageSelect from '@/components/FormElements/Selects/GameStageSelect'
  import CheckBox from '@/components/FormElements/CheckBox'

  export default {
    name: 'Form',
    components: {
      Button,
      InputField,
      SearchField,
      TextArea,
      SeasonSelect,
      CountrySelect,
      StateSelect,
      GenderSelect,
      GameStageSelect,
      CheckBox,
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

        if(r.field === 'checkbox'){
          vals[r.name] = ref(r.value === true ? r.returnValue : null)
        } else {
          vals[r.name] = ref(r.value || '')
        }

        // TODO: Value an Select übergeben
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
  form {
    margin: 0 auto;
    width: fit-content;
  }

  div {
    width: fit-content;
  }

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
