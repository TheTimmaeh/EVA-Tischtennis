<template>
  <tr :class="{ isLast }">
    <td v-if="path === 'persons'">
      <router-link v-if="loggedIn || isAdmin" :to="`/persons/${id}/profile`">{{ name }}</router-link>
      <template v-else>{{ name }}</template>
    </td>
    <td v-else>{{ name }}</td>
    <td>{{ surname }}</td>
    <td v-if="isAdmin">
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
      path: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      loggedIn: {
        type: Boolean,
        default: false,
      },
    },
    setup(props){
      return {
        ...props.data,
        isLast: props.isLast,
        path: props.path,
        isAdmin: props.isAdmin,
        loggedIn: props.loggedIn,
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
