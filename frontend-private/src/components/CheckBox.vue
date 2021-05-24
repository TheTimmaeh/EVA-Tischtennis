<template>
  <input type="checkbox"  v-model="checkedVals"
    :value="checkedVal"
    >
</template>


<script>


export default {
    name:'CheckBox',
    props: {
      label: {
        type: String,
      },
    },
    emits: {
      'update:modelValue': null,
    },
    data() {
      return { checkedVal:Boolean}
    },
    methods: {
      updateVals(e) {
        let isChecked = e.target.checked
        let val = e.target.value

        if (isChecked) {
          this.checkedVal = true
        } else {
          this.checkVal = false
        }
      }
    }
  }
</script>

<style  lang="scss" scoped>

input{
    height: 30px;
    width: 30px;
    border: 1px solid $color-info;
}

</style>