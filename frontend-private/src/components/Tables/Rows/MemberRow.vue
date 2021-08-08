<template>
  <tr :class="{ isLast }">
    <template v-if="path === 'persons'">
      <router-link :to="`/persons/${id}/profile`">
        <td>{{ name }}</td>
      </router-link>
    </template>
    <template v-else>
      <td>{{ name }}</td>
    </template>
    <td>{{ surname }}</td>
    <!-- <td>{{ teams?.length }}</td> -->
    <td>
      <router-link :to="`/${path}/${id}/update`">
        <Button><Icon type="edit" /></Button>
      </router-link>
    </td>
  </tr>
</template>

<script>
  import { ref } from 'vue'
  import Button from '@/components/FormElements/Button'
  import Icon from '@/components/Icons/Icon'

  export default {
    name: 'MemberRow',
    components: {
      Button,
      Icon,
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
      },
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
