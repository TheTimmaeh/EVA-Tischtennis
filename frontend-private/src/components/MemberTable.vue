<template>
  <Card>
    <table>
      <colgroup>
        <col class="thirty" />
        <col class="thirty" />
        <col class="thirty" />
        <col class="min" />
      </colgroup>
      <thead>
        <tr>
          <th>Vorname</th>
          <th>Nachname</th>
          <th>Mannschaft</th>
          <th>Bearbeiten</th>
        </tr>
      </thead>
      <MemberRow v-for="(member, index) in members" :key="member.id" :data="member" :isLast="members.length - 1 == index" />
    </table>
  </Card>
</template>

<script>
  import Card from './Card.vue'
  import Button from './Button.vue'
  import MemberRow from './MemberRow'

  export default {
    name: 'MemberTable',
    components: {
      Card,
      Button,
      MemberRow,
    },
    props: {
      members: {
        type: Array,
        required: true,
      },
    },
    setup(props){
      return {
        members: props.members,
      }
    },
  }
</script>

<style lang="scss" scoped>
  table {
    table-layout: fixed;
    text-indent: initial;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th {
    text-align: inherit;
    padding: 8px 12px;
    vertical-align: top;
    // width: 30em;
  }

  td:last-child {
    border-bottom: 0px solid $color-mono-light;
  }

  thead {
    border: 1px solid $color-mono-light;
    border-width: 0 0 1px;
  }

  .thirty {
    width: 33%;
  }

  .min {
    width: 1%;
    white-space: nowrap;
  }
</style>
