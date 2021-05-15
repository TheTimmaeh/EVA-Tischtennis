<template>
  <div>
    <textarea class="" placeholder="Hinweis....">
    </textarea>
  </div>
</template>

<style lang="scss" scoped>
textarea{  
	width: 450px;
	height: 100px;
	border: 1px solid $color-info;
	padding: 9,5px;
  border-radius: 5px; 
}
textarea:focus{
  outline: none !important;
  border-color: $color-highlight;
  box-shadow: 0 0 10px $color-highlight-light;
}
.danger:focus{
  outline: none !important;
  border-color: $color-danger;
  box-shadow: 0 0 10px $color-danger;
}
.warning:focus{
  outline: none !important;
  border-color: $color-warning;
  box-shadow: 0 0 10px $color-warning;
}
div{
  padding: 15px;
}
</style>