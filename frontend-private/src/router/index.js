import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import Components from '../views/Components.vue'

const Login = () => import('../views/Login.vue')
const Logout = () => import('../views/Logout.vue')
const Profile = () => import('../views/Profile.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/components',
    name: 'Components',
    component: Components,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
]

const publicPages = ['/', '/components', '/login', '/publicsocket']

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if(!publicPages.includes(to.path) && !(store.state && store.state.user && store.state.user.token)) return next('/login')

  next()
})

export default router
