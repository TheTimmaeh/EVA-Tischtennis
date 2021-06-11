<template>
  <Card>
      <div class="header">
        <div class="primary-title">
          <div class="title">{{associationName}}</div>
        </div>
      </div>
      <div class="body">
        <tr>
          <td>Ort: {{countryName}}</td>
          <td>Spielerklassen: {{numberassociationClasses}}</td>
          <td>Mitglieder: {{numberMembers}}</td>
          <td class="min">
            <Button>Bearbeiten</Button>
          </td>
        </tr>
      </div>
  </Card>
</template>

<script>
  import { computed } from 'vue'
  import { ref } from 'vue'
  import Button from '@/components/Button'
  import Card from '@/components/Card'

  export default {
    name: 'AssosciationCard',
    components: {
      Button,
      Card,
    },
     props: {
       data: {
        type: Object,
        required: true,
      },
    },
    setup(){

      return {
        ...props.data,
      }
    },
  }
</script>

<style lang="scss" scoped>

.header{
    font-size: 18px;
    text-align: left;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    width:100%;
    min-height: 40px;
    padding: 16px;
    position: relative;
    border: 1px solid $color-mono-light;
    border-width: 0 0 1px;
}
.header .primary-title{
  bottom: auto;
  display: inline-block;
  padding: 0;
  position: absolute;
  top: 50%;
  -moz-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  -o-transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
.title {
  font-size: 14px;
  font-weight:bold;
}
.body{
    color:$color-light-text;
    padding: 16px;
    text-align: left;
    text-decoration: none;
    font-size: 14px;
    width:100%;
    line-height: 1.5;
    border-width: 0 0 1px;
}
td{
    text-align: inherit;
    display: table-cell;
    width: 30em;
}
tr{
    text-align: inherit;
}
.min {
    width: 1%;
    white-space: nowrap;
}
</style>
