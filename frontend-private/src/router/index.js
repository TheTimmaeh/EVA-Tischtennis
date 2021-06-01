import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import Components from '../views/Components.vue'

// Associations
const Associations = () => import('../views/Associations/Index.vue')
const CreateAssociation = () => import('../views/Associations/Create.vue')

// Saisons
const Seasons = () => import('../views/Seasons/Index.vue')
const CreateSeason = () => import('../views/Seasons/Create.vue')

// Members
const Members = () => import('../views/Members/Index.vue')
const CreateMember = () => import('../views/Members/Create.vue')

// Persons
const Persons = () => import('../views/Persons/Index.vue')
const CreatePerson = () => import('../views/Persons/Create.vue')

// Referees
const Referees = () => import('../views/Referees/Index.vue')
const CreateReferee = () => import('../views/Referees/Create.vue')

// PlayerClasses
const PlayerClasses = () => import('../views/PlayerClasses/Index.vue')
const CreatePlayerClass = () => import('../views/PlayerClasses/Create.vue')

// Competitions
const Competitions = () => import('../views/Competitions/Index.vue')
const CreateCompetition= () => import('../views/Competitions/Create.vue')

// AssociationTeams                             
const AssociationTeams = () => import('../views/AssociationTeams/Index.vue')
const CreateAssociationTeam= () => import('../views/AssociationTeams/Create.vue')

// Match                             
const Match = () => import('../views/Match/Match.vue')

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
    path: '/associations',
    name: 'Associations',
    component: Associations,
  },
  {
    path: '/associations/create',
    name: 'CreateAssociation',
    component: CreateAssociation,
  },
  {
    path: '/seasons',
    name: 'Seasons',
    component: Seasons,
  },
  {
    path: '/seasons/create',
    name: 'CreateSeason',
    component: CreateSeason,
  },
  {
    path: '/members',
    name: 'Members',
    component: Members,
  },
  {
    path: '/members/create',
    name: 'CreateMember',
    component: CreateMember,
  },
  {
    path: '/persons',
    name: 'Persons',
    component: Persons,
  },
  {
    path: '/persons/create',
    name: 'CreatePerson',
    component: CreatePerson,
  },
  {
    path: '/referees',
    name: 'Referees',
    component: Referees,
  },
  {
    path: '/referees/create',
    name: 'CreateReferee',
    component: CreateReferee,
  },
  {
    path: '/playerClasses',
    name: 'PlayerClasses',
    component: PlayerClasses,
  },
  {
    path: '/playerClasses/create',
    name: 'CreatePlayerClass',
    component: CreatePlayerClass,
  },
  {
    path: '/competitions',
    name: 'Competitons',
    component: Competitions,
  },
  {
    path: '/competitions/create',
    name: 'CreateCompetiton',
    component: CreateCompetition,
  },
  {
    path: '/associationTeams',
    name: 'AssociationTeams',
    component: AssociationTeams,
  },
  {
    path: '/associationTeams/create',
    name: 'CreateAssociationTeam',
    component: CreateAssociationTeam,
  },
  {
    path: '/match',
    name: 'Match',
    component: Match,
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
