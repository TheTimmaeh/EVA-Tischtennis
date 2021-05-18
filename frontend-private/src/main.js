import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initStore, authHeader } from '@/helper'

createApp(App)

  // Vuex
  .use(store)

  // Vue Router
  .use(router)

  // Mount it
  .mount('#app')

initStore()
