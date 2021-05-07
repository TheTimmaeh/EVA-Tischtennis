<template>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Logout',
  setup(){
    const store = useStore()
    const router = useRouter()

    store.dispatch('resetUser')
    router.push({ path: '/' })

    return {}
  }
}
</script>
