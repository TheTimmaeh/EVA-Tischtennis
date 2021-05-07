<template>
  <div>
    <table>
      <tr>
        <td>Username:</td>
        <td>{{ username }}</td>
      </tr>
      <tr>
        <td>isAdmin:</td>
        <td>{{ isAdmin }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  export default {
    setup(){
      const store = useStore()

      return {
        username: computed(() => store.state.user.username),
        isAdmin: computed(() => store.state.user.isAdmin),
      }
    }
  }
</script>

<style lang="scss">
  table {
    display: inline-block;

    td {
      padding: 5px 3px;
      text-align: left;
    }
  }
</style>
