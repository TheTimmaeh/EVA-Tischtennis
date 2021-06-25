<template>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { api, setTitle } from '@/helper'

export default {
  name: 'Logout',
  setup(){
    setTitle('Logout')
    const store = useStore()
    const router = useRouter()

    api({ method: 'POST', path: '/auth/logout' }).then((res) => {
      if(!res.data){
        console.error(res)
      } else {
        store.dispatch('resetUser')
        router.push({ path: '/' })
      }
    }).catch((err) => {
      console.error(err)
    })   

    return {}
  }
}
</script>
