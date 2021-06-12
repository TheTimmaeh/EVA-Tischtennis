<template>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { setTitle } from '@/helper'

export default {
  name: 'Logout',
  setup(){
    setTitle('Logout')
    const store = useStore()
    const router = useRouter()

    store.dispatch('resetUser')
    router.push({ path: '/' })

    return {}
  }
}
</script>
