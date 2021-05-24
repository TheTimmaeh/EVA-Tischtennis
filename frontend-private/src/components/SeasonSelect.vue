<template>
    <select class="" placeholder="Hinweis...." ref="seasonSelect" >
      <option v-for="option in options" :key="option.key" :value="option.value">{{ option.text }}</option>
    </select>
    <!--<Select :options="options"></Select>-->

</template>

<script>

//import Select from '../components/Select'
  export default {
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
       // Select
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
