<template>
  <div>
    <select class="" placeholder="Hinweis....">
      <option v-for="option in options" :key="option.key" :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    props: {
      options: {
        required: true,
      },
    },
    setup(props){
      return {
        options: props.options,
      }
    },
  }
</script>

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
