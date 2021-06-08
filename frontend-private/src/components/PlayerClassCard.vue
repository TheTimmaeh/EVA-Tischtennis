<template>
    <div class="row">
            <tr>
                <td>
                    {{name}}
                </td>
                <td>
                    {{age}}
                </td>
                <td>
                    {{gender}}
                </td>
                <td>
                    <Button>Bearbeiten
                    </Button>
                </td>
            </tr>
     </div>
</template>

<script>

import Button from "./Button";
import { ref } from 'vue'

export default {
  name: 'PlayerClassCard',
  components:{Button},
  setup(){
    let name = ref('Spielerklassenname')
    let age = ref('Alter')
    let gender = ref('Geschlecht')

    return {
      name,
      age,
      gender
    }
  },
}
</script>

<style lang="scss" scoped>
.card{
  background-color: white;
  border: bold;
  color: $color-dark-text;
  padding: 10px 25px;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
  height: 65px;
  width: 100%;
  border: 2px;
  border-color: $color-info;
  border-style: solid;
  border-radius: 5px;
  margin: 8px;
  overflow: hidden;
  position: relative;
  border-collapse: collapse;
  text-align: inherit;



  &:hover{
      box-shadow: 0 4px 4px 0 $color-info;
  }
}
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
  display: inline-block;
  margin: 10px;
}
.title + .subhead {
  margin-top: 7px;
  color: $color-light-text;
}
.body{
    color:$color-light-text;
    padding: 16px;
    text-align: left;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    width:100%;
    line-height: 1.5;
    border: 1px solid $color-mono-light;
    border-width: 0 0 1px;
}

Button{
    margin: 10px 20px;
}

td{
    text-align: inherit;
    display: table-cell;
    width: 30em;
}
tr{
    text-align: inherit;
}
.row{
  background-color: white;
  color: $color-dark-text;
  padding: 10px 25px;
  text-align: left;
  text-decoration: none;
  display: block;
  font-size: 14px;
  border: 2px solid $color-info;
  border-radius: 5px;
  margin: 8px;
  overflow: hidden;
  position: relative;

  &.warning {
    background-color: $color-warning;
    color: $color-dark-text;
  }

  &.danger {
    background-color: $color-danger;
  }

  &:hover {
    box-shadow: 0 4px 4px 0 $color-info;
  }
}
</style>
