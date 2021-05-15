<template>
  <div>
    <select class="" placeholder="Hinweis....">
    </select>
  </div>
</template>

<style lang="scss" scoped>
select{  
	width: 450px;
	height: 25px;
	border: 1px solid $color-info;
	padding: 7 9,5px;
  border-radius: 5px; 
}
select:focus{
    outline: none !important;
    border-color: $color-info;
    box-shadow: 0 0 10px $color-info;
}
div{
  padding: 15px;
}
</style>