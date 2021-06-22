<template>
  <tr :class="{ isLast }">
    <td v-for="x in data" :key="x" >{{x}}</td>
    <td>
      <Button>Bearbeiten</Button>
    </td>
  </tr>
</template>

<script>
  import { ref } from 'vue'
  import Button from '@/components/Button'

  export default {
    name: 'MemberRow',
    components: {
      Button,
    },
    props: {
      data: {
        type: Array,
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
