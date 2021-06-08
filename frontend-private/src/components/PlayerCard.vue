<template>
  <div class="card ">
      <div class="header">
        <div class="primary-title">
          <div class="title">{{playerName}}</div>
          <div class="subhead">{{associationName}}</div>
        </div>
      </div>
      <div class="body">{{description}}</div>
      <div class="footer">
        <Button>Bearbeiten</Button>
      </div>
  </div>
</template>

<script>

import Button from "./Button";
import { ref } from 'vue'

export default {
  name: 'PlayerCard',
  components:{Button},
  setup(){
    let playerName = ref('Spielername konnte nicht geladen werden')
    let associationName = ref('Vereinsname konnte nicht geladen werden')
    let description = ref('Es tut uns leid aber der Beschreibungstext des Spielers konnte nicht geladen werden.')

    return {
      playerName,
      associationName,
      description,
    }
  },
}
</script>

<style lang="scss" scoped>
.card{
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
.footer{
    color:$color-light-text;
    padding: 9px;
    text-align: left;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    width:100%;
    min-height: 52px;
    position: relative;
    z-index: 1
}
</style>
