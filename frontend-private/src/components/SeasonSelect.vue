<template>
    <select class="" placeholder="Hinweis...." ref="seasonSelect" v-model="selected">
      <option v-for="option in options" :key="option.key" :value="option.value">{{ option.text }}</option>
    </select>

</template>

<script>

  export default {
    data () {
      return {
        selected: ''
      }
    },
    props: {
      options: 
        [{key:1, value:"wi", text:"Winter"}, {key:2, value:"su", text:"Sommer"} ]
      ,
      label: {
        type: String,
        default: '',
      },
    },
    setup(props){
      return {
        options: [{key:1, value:"wi", text:"Winter"}, {key:2, value:"su", text:"Sommer"} ],
       
      }
    },
  }
</script>

<style lang="scss" scoped>
select{
	width: 450px;
	height: 40px;
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
