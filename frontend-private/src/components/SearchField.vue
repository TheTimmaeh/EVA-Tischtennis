<template>
  <div class="wrapper">
    <ul v-if="hasResult && isFocused">
      <li v-if="entries.length < 1">Nichts gefunden</li>
      <li v-for="(entry, index) of entries" :key="index" @click="setValue(entry)">{{ formatEntry(entry) }}</li>
    </ul>
    <div class="input">
      <InputField
        type="text"
        :error="error"
        :level="props.level"
        :label="props.label"
        :placeholder="props.placeholder"
        :value="inputValue"
        @input="debounce($event.target.value)"
        @focusin="setFocus(true)"
        @focusout="setFocus(false)"
      />
    </div>
  </div>
</template>

<script>
  import { ref, computed } from 'vue'
  import { api } from '@/helper'
  import InputField from '@/components/InputField'

  export default {
    name: 'SearchField',
    components: {
      InputField,
    },
    props: {
      apiPath: {
        type: String,
        required: true,
      },
      displayFormat: {
        type: String,
        required: true,
      },
      returnPath: {
        type: String,
        default: '',
      },
      lookupRow: {
        type: [String, Array],
        required: true,
      },
      limit: {
        type: Number,
        default: 5,
      },
      delay: {
        type: Number,
        default: 500,
      },
      modelValue: {
        type: [String, Number, Object, Boolean],
      },
      displayValue: {
        type: String,
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
    },
    emits: {
      'update:modelValue': null,
    },
    setup(props, { emit }){
      const error = ref(props.error === 'true' ? true : props.error)

      const inputValue = ref(props.displayValue || props.modelValue || '')
      const hasResult = ref(false)
      const isFocused = ref(false)
      const entries = ref([])

      const parsePath = (data, path) => {
        if(!path || path == '') return data
        return path.split('.').reduce((o, i) => o[i], data)
      }

      const formatEntry = (entry) => {
        let value = props.displayFormat
        let pattern = /{{(.+?)}}/g

        let match

        while((match = pattern.exec(props.displayFormat)) !== null){
          value = value.replace(match[0], entry[match[1].trim()] || '')
        }

        return value
      }

      const setValue = (data) => {
        let value = formatEntry(data)

        inputValue.value = value
        hasResult.value = false

        emit('update:modelValue', parsePath(data, props.returnPath))
      }

      const doSearch = async (input) => {
        let result = (await api({ path: props.apiPath, data: { filter: { lookupRow: props.lookupRow, type: 'like', query: input }, order: props.lookupRow, limit: props.limit }}))?.data

        if(result.success){
          entries.value = result.data
          hasResult.value = true
        }
      }

      let timeout, current

      const debounce = (input) => {
        input = input.trim()

        // Input has not changed
        if(current == input) return
        current = input

        // Empty input, hide entries
        if(input == '') return hasResult.value = false

        clearTimeout(timeout)
        timeout = setTimeout(() => {
          doSearch(input)
        }, props.delay)
      }

      const setFocus = (focused) => {
        if(focused) isFocused.value = true
        else setTimeout(() => isFocused.value = false, 100)
      }

      return {
        props,
        error,
        debounce,
        setValue,
        hasResult,
        isFocused,
        setFocus,
        entries,
        inputValue,
        parsePath,
        formatEntry,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    display: inline-block;
    position: relative;
    width: 450px;
    height: 41px;
  }

  .input {
    position: absolute;
    top: 0;
    left: 0;
  }

  ul {
    position: absolute;
    border: 1px solid $color-info;
    border-radius: 0 0 5px 5px;
    top: 33px;
    left: 0;
    width: 100%;
    background-color: white;
    overflow: hidden;

    li {
      list-style-type: none;
      padding: 6px 8px;
      text-align: left;
      border-top: 1px solid $color-info;

      &:first-child {
        border-top: 0px;
        padding-top: 14px;
      }

      &:hover {
        background-color: $color-highlight;
        cursor: pointer;
      }
    }
  }
</style>
