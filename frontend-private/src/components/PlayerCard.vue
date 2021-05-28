<template>
  <div class="card ">
      <div class="header">
        <div class="primary-title">
          <div class="title">Spielername</div>
          <div class="subhead">Mannschaft</div>
        </div>
      </div>
      <div class="body">Tim ist der Beste Tennisspieler aller Zeiten und er wohnt in bla bla. Das ist ein Geheimnis.
      </div>
      <div class="footer">
        <Button>
        </Button>
      </div>
  </div>
</template>

<script>

import Button from "./Button";

export default {
  name: 'Home',
  components:{Button},
  setup(){
    return { }
  }
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
  height:200px;
  width:400px;;
  border-color: $color-info;
  border-style: solid;
  margin: 8px;
  overflow: hidden;
  position: relative;
  border-collapse: collapse;
  border-radius: 5px; 

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