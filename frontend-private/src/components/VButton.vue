<template>
  <div>
    <button class="VButton danger">Test
    </button>
  </div>
</template>

<style lang="scss" scoped>
.VButton{
  background-color: $color-primary; 
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 5px;

  &.warning{
    background-color: $color-warning;
    color: $color-dark-text;
  }

  &.danger{
    background-color: $color-danger;
  }
}
</style>