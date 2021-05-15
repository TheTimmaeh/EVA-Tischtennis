<template>
  <div class="home">
    EVA Tischtennis
    <div>
    </div>
  </div>
  
</template>

<script>
import { axios } from '@/helper'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export default {
  name: 'Home',
  components:{},
  setup(){
    return { }
  }
}
</script>

<style lang="scss" scoped>
.home{
background-color: $color-fade-grey;
}

</style>

