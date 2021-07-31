<template>
  <Card >
    <table>
      <colgroup>
        <col class="thirty" />
        <col class="thirty" />
        <col class="thirty" />
        <col class="min" />
      </colgroup>
      <thead>
        <tr>
          <th>MOD</th>
          <th>Heim</th>
          <th>Gast</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>Sätze</th>
          <th>Punte</th>
        </tr>
      </thead>
      <MatchRow v-for="(match, index) in matches" :key="match.id" :data="match" :isLast="matches.length - 1 == index" :path="path"/>
    </table>
  </Card>
</template>

<script>
  import { computed } from 'vue'
  import Card from '@/components/Cards/Card'
  import Button from '@/components/FormElements/Button'
  import MatchRow from '@/components/Tables/Rows/MatchRow'

  export default {
    name: 'CompetitionTable',
    components: {
      Card,
      Button,
      MatchRow,
    },
    props: {
      matches: {
        type: Array,
        required: true,
      },
    },
    setup(props){
      const matches = computed(() => props.matches)

      return {
        matches,
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
