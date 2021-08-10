<template>
  <tr :class="{ isLast }">
    <td>{{1}}</td>
    <td>{{2}}</td>
    <td>{{3}}</td>
    <td>{{4}}</td>
    <td>{{5}}</td>
    <td>{{setes}}</td>
    <td>{{points}}</td>
  </tr>
</template>

<script>
  import { ref } from 'vue'

  export default {
    name: 'MatchRow',
    components: {
      
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
    },
    setup(props){
      return {
        ...props.data,
        isLast: props.isLast,
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
