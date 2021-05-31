<template>
  <div class="associationCard ">
      <div class="header">
        <div class="primary-title">
          <div class="title">{{associationName}}</div>
        </div>
      </div>
      <div class="body">
        <div class="country">Ort: {{countryName}}</div>
        <div class="assocoiationClasses">Spielerklassen: {{numberassociationClasses}}</div>
        <div class="members">Mitglieder: {{numberMembers}}</div>
      </div>
      <div class="footer">
        <Button>Bearbeiten
        </Button>
      </div>
  </div>
</template>

<script>

import Button from "./Button";
import { ref } from 'vue'

export default {
  name: 'AssosciationCard',
  components:{Button},
  setup(){
    let associationName = ref('Beispielverein')
    let countryName = ref('BeispielOrt')
    let numberassociationClasses = ref('0')
    let numberMembers = ref('0')

    return {
      associationName,
      countryName,
      numberassociationClasses,
      numberMembers,
    }
  },
}

</script>

<style lang="scss" scoped>
.associationCard{
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
    font-size: 14px;
    width:100%;
    line-height: 1.5;
    border: 1px solid $color-mono-light;
    border-width: 0 0 1px;
}
.country{
    display:inline-block; 
    padding: 10px 20px;
}
.assocoiationClasses{
    display:inline-block;
    padding: 10px 20px; 
}
.members{
    display:inline-block; 
    padding: 10px 20px;
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