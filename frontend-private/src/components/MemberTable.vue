<template>
  <div class="tableCard">
      <table class="table">
        <div class="header">
            <tr>
                <th> Vorname
                </th>
                <th> Nachname
                </th>
                <th> Mannschaft
                </th>
                <th> Bearbeiten
                </th>
            </tr>
        </div>
        <MemberRow></MemberRow>
      </table>
  </div>
</template>

<script>

import Button from './Button.vue';
import MemberRow from './MemberRow';

export default {
  name: 'MemberTable',
  components:{Button, MemberRow},
  setup(){
    return { }
  }
}
</script>

<style lang="scss" scoped>
.tableCard{
  background-color: white; 
  border: bold;
  color: $color-dark-text;
  padding: 10px 25px;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
  height:200px;
  width:400px;
  width:800px;;
  border: 2px;
  border-color: $color-info;
  border-style: solid;
  border-radius: 5px; 
  margin: 8px;
  overflow: hidden;
  position: relative;

  &.warning{
    background-color: $color-warning;
    color: $color-dark-text;
  }

  &.danger{
    background-color: $color-danger;
  }

  &:hover{
      box-shadow: 0 4px 4px 0 $color-info;
  }
}

table{
    table-layout: fixed;
    text-indent: initial;
    border-collapse: collapse;
    border-spacing: 0;
}

th{
    text-align: inherit;
    padding: 8px 12px;
    vertical-align: top;
    width: 30em;
}

.header{
    border: 1px solid $color-mono-light;
    border-width: 0 0 1px;
}
</style>