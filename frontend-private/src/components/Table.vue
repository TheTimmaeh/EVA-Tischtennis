<template>
  <Card v-if="content?.length > 0">
    <table>
      <colgroup>
        <col class="thirty" />
        <col class="thirty" />
        <col class="thirty" />
        <col class="min" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="title in titles" :key="title.id" > {{title.text}}</th>
        </tr>
      </thead>
      <Row v-for="(row, index) in content" :key="row.id" :data="row.content" :isLast="content.length - 1 == index" />
    </table>
  </Card>
</template>

<script>
  import { computed } from 'vue'
  import Card from '@/components/Card'
  import Button from '@/components/Button'
  import Row from './Row'

  export default {
    name: 'MemberTable',
    components: {
      Card,
      Button,
      Row,
    },
    props: {
      content: {
        type: Array,
        required: true,
      },
      titles: {
        type: Array,
        required: true,
      },
    },
    setup(props){
      const content = computed(() => props.content)
      const title = computed(() => props.title)
      return {
        content,
        title,
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
