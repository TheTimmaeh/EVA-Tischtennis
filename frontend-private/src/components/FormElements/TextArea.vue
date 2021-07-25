<template>
  <textarea ref="textarea" :class="[ props.level, { autoresize }]" :placeholder="props.placeholder" :id="props.label" @input="adjustHeight(), $emit('update:modelValue', $event.target.value)">{{ props.modelValue }}</textarea>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    name: 'TextArea',
    props: {
      placeholder: {
        type: String,
        default: '',
      },
      modelValue: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      level: {
        type: String,
        validator: (v) => ['', 'warning', 'danger'].includes(v),
      },
      autoresize: {
        type: [Boolean, String],
        default: true,
      },
    },
    emits: {
      'update:modelValue': null,
    },
    setup(props){
      const textarea = ref(null)
      const autoresize = ref(props.autoresize === 'false' ? false : props.autoresize)

      function adjustHeight(){
        if(!autoresize.value) return
        let originalHeight = parseInt(textarea.value.style.height.replace(/\D/g, '')) || 0
        textarea.value.style.height = '1px'
        textarea.value.style.minHeight = '1px'
        let scrollHeight = textarea.value.scrollHeight
        textarea.value.style.minHeight = `${scrollHeight}px`
        textarea.value.style.height = `${(scrollHeight > originalHeight ? scrollHeight : originalHeight)}px`
      }

      onMounted(adjustHeight)

      return {
        textarea,
        adjustHeight,
        autoresize,
        props,
      }
    }
  }
</script>

<style lang="scss" scoped>
  textarea {
    width: 450px;
    height: 100px;
    line-height: 15px;
    min-height: 15px;
    border: 1px solid $color-info;
    padding: 12px 10px;
    border-radius: 5px;

    &.autoresize {
      height: 15px;
      resize: vertical;
      overflow: hidden;
    }

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

    &.danger:focus {
      outline: none !important;
      border-color: $color-danger;
      box-shadow: 0 0 10px $color-danger;
    }
  }
</style>
