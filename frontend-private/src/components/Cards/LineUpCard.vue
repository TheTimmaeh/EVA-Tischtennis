
<template>
  <Card v-if="members.length > 0">
    <table>
      <colgroup>
        <col class="thirty" />
        <col class="thirty" />
        <col class="thirty" />
        <col class="min" />
      </colgroup>
      <thead>
        <tr>
          <th>Stellung</th>
          <th>Vorname</th>
          <th>Nachname</th>
          <th>Bearbeiten</th>
        </tr>
      </thead>
      <CompetitionerRow v-for="(member, index) in members" :key="member.id" :data="member" :isLast="members.length - 1 == index" :path="path" :loggedIn="loggedIn" />
    </table>
  </Card>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import Card from '@/components/Cards/Card'
  import Button from '@/components/FormElements/Button'
  import CompetitionerRow from '@/components/Tables/Rows/CompetitionerRow'

  export default {
    name: 'MemberTable',
    components: {
      Card,
      Button,
      CompetitionerRow,
    },
    props: {
      members: {
        type: Array,
        required: true,
      },
      path:{
        type: String,
        required: true,
      }
    },
    setup(props){
      const members = computed(() => props.members)
      const store = useStore()
      let loggedIn = computed(() => !!store?.state?.user?.username)

      return {
        members,
        path: props.path,
        loggedIn,
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

  thead {
    border: 1px solid $color-mono-light;
    border-width: 0 0 1px;
  }

  th {
    text-align: inherit;
    padding: 8px 12px;
    vertical-align: top;
  }

  td:last-child {
    border-bottom: 0px solid $color-mono-light;
  }

  .thirty {
    width: 33%;
  }

  .min {
    width: 1%;
    white-space: nowrap;
  }
</style>
