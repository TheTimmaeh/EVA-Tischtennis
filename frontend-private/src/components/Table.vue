<template>
  <div class="table-card">
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
        <div class="row">
            <tr>
                <td>
                    Tim
                </td>
                <td>
                    Elbert
                </td>
                <td>
                    LBV
                </td>
                <td>
                    <VButton>
                    </VButton>
                </td>
            </tr>
        </div>
      </table>
  </div>
</template>

<script>

import VButton from './VButton.vue';

export default {
  name: 'Home',
  components:{VButton},
  setup(){
    return { }
  }
}
</script>

<style lang="scss" scoped>
.table-card{
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
  border-color: $color-info;
  border-style: solid;
  margin: 8px;
  overflow: hidden;
  position: relative;
  border-radius: 5px; 

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
td{
    text-align: inherit;
    display: table-cell;
    padding: 8px 12px;
    width: 30em;
}
tr{
    padding: 8px 12px;
    text-align: inherit;
}
.header{
    border: 1px solid $color-mono-light;
    border-width: 0 0 1px;
}
.row{
    border: 1px solid $color-mono-light;
    border-width: 0 0 1px;
}
</style>