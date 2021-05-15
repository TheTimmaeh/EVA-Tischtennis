<template>
  <div>
    <input class="" placeholder="Hinweis....">
  </div>
</template>

<style lang="scss" scoped>
input{  
	border: 1px solid $color-info;
	padding: 7 9,5px;
  border-radius: 5px; 
  width: 450px;
  height:38px;
}
input:focus{
    outline: none !important;
    border-color: $color-info;
    box-shadow: 0 0 10px $color-info;
}
div{
  padding: 15px;
}
</style>