import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Socket from '../views/Socket.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/socket',
    name: 'Socket',
    component: Socket,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
