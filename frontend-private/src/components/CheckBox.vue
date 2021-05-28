<template>
  <input type="checkbox"  
     id="checkbox" v-model="checked"
    >
</template>


<script>
export default {
    name:'CheckBox',
    data () {
      return {
        checked: false,
      }
    },
    props: {
      label: {
        type: String,
      },
    },
  }
</script>

<style  lang="scss" scoped>

input{
    height: 30px;
    width: 30px;
    border: 1px solid $color-info;
}

</style>