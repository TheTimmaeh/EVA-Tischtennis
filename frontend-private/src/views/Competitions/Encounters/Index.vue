<template>
  <div class="encounters">
    <div class="list">Liste der Begegnungen</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { api, setTitle } from '@/helper'
import Button from '@/components/Button'

export default {
  name: 'Encounters',
  components: {
    Button,
  },
  setup(){
    setTitle('Begegnungen')

    const competitions = ref([])

    api('/encounters').then((res) => res.data).then((res) => {
      if(!res.success){
        console.error('Fehler...', res)
        return
      }

      encounters.value = res.data
    })


    return {
      encounters,
    }
  },
}
</script>

<style lang="scss" scoped>
.list{
  padding: 20px;
}
</style>
