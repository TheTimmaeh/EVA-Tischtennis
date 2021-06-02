<template>
  <div class="card ">
      <div class="header">
        <div class="primary-title">
          <div class="title">{{season}}</div>
          <div class="title">{{year}}</div>
          <Button>Bearbeiten</Button>
        </div>
      </div>
  </div>
</template>

<script>

import Button from "./Button";
import { ref } from 'vue'

export default {
  name: 'SeasonCard',
  components:{Button},
  setup(){
    let season = ref('Saison konnte nicht geladen werden')
    let year = ref('Jahr konnte nicht geladen werden')

    return {
      season,
      year,
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
  width:800px;;
  border: 2px;
  border-color: $color-info;
  border-style: solid;
  border-radius: 5px; 
  margin: 8px;
  overflow: hidden;
  position: relative;
  border-collapse: collapse;
  
  

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
</style>