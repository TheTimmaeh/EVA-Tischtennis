<template>
  <tr :class="{ isLast }">
    <td>{{position}}</td>
    <td>{{member}}</td>
  </tr>
</template>

<script>
  import { ref } from 'vue'
  import Button from '@/components/Button'

  export default {
    name: 'CompetitionerRow',
    components: {
      Button,
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
      isLast: {
        type: Boolean,
        default: false,
      },
      path:{
        type: String,
        required: true, 
      }
    },
    setup(props){
      return {
        ...props.data,
        isLast: props.isLast,
        path: props.path,
      }
    },
  }
</script>

<style lang="scss" scoped>
  td {
    text-align: inherit;
    display: table-cell;
    padding: 8px 12px;
    vertical-align: top;
  }

  tr {
    padding: 8px 12px;
    text-align: inherit;
    border-bottom: 1px solid $color-mono-light;

    &.isLast {
      border-bottom: 0;
    }

    &:hover {
      box-shadow: 0 4px 4px 0 $color-info;
    }
  }
</style>
