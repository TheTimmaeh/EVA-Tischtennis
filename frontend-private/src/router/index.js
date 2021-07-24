import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import Components from '../views/Components.vue'

// Associations
const Users = () => import('../views/Users/Index.vue')
const CreateUser = () => import('../views/Users/Create.vue')
const UpdateUser = () => import('../views/Users/Update.vue')

const Associations = {
  Index: () => import('../views/Associations/Index.vue'),
  Get: () => import('../views/Associations/Get.vue'),
  Create: () => import('../views/Associations/Create.vue'),
  Update: () => import('../views/Associations/Update.vue'),
  Profile: () => import('../views/Associations/Profile.vue'),
  Members: () => import('../views/Associations/Members.vue'),
  Teams: {
    Index: () => import('../views/Associations/Teams/Index.vue'),
    Get: () => import('../views/Associations/Teams/Get.vue'),
    Create: () => import('../views/Associations/Teams/Create.vue'),
    Update:() => import('../views/Associations/Teams/Update.vue'),
    LineUp:() => import('../views/Associations/Teams/LineUp.vue'),
    LineUpCreate:() => import('../views/Associations/Teams/LineUpCreate.vue'),
    LineUpUpdate:() => import('../views/Associations/Teams/LineUpUpdate.vue'),
  },
}

// Saisons
const Seasons = () => import('../views/Seasons/Index.vue')
const CreateSeason = () => import('../views/Seasons/Create.vue')
const UpdateSeason = () => import('../views/Seasons/Update.vue')
const DeleteSeason = () => import('../views/Seasons/Delete.vue')

// Persons
const Persons = () => import('../views/Persons/Index.vue')
const CreatePerson = () => import('../views/Persons/Create.vue')
const UpdatePerson = () => import('../views/Persons/Update.vue')

// Referees
const Referees = () => import('../views/Referees/Index.vue')
const CreateReferee = () => import('../views/Referees/Create.vue')

// PlayerClasses
const PlayerClasses = () => import('../views/PlayerClasses/Index.vue')
const CreatePlayerClass = () => import('../views/PlayerClasses/Create.vue')
const UpdatePlayerClass = () => import('../views/PlayerClasses/Update.vue')

// Competitions
const Competitions = () => import('../views/Competitions/Index.vue')
const CreateCompetition = () => import('../views/Competitions/Create.vue')
const UpdateCompetition = () => import('../views/Competitions/Update.vue')

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
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    component: CreateUser,
  },
  {
    path: '/users/:userId/update',
    name: 'UpdateUser',
    component: UpdateUser,
  },
  {
    path: '/associations',
    name: 'Associations',
    component: Associations.Index,
  },
  {
    path: '/associations/create',
    name: 'CreateAssociation',
    component: Associations.Create,
  },
  {
    path: '/associations/:associationId/update',
    name: 'UpdateAssociation',
    component: Associations.Update,
  },
  {
    path: '/associations/:associationId',
    name: 'Association',
    component: Associations.Get,
    children: [
      {
        path: '',
        component: Associations.Profile,
      },
      {
        path: 'members',
        component: Associations.Members,
      },
      {
        path: 'teams',
        component: Associations.Teams.Index,
      },
      {
        path: 'teams/create',
        component: Associations.Teams.Create,
      },
      {
        path: 'teams/:teamId',
        component: Associations.Teams.Get,
      },
      {
        path: 'teams/:teamId/update',
        component: Associations.Teams.Update,
      },
      {
        path: 'teams/:teamId/members',
        component: Associations.Teams.LineUp,
      },
      {
        path: 'teams/:teamId/members/create',
        component: Associations.Teams.LineUpCreate,
      },
      {
        path: 'teams/:teamId/members/update',
        component: Associations.Teams.LineUpUpdate,
      },
    ]
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
    path: '/seasons/:seasonId/update',
    name: 'UpdateSeason',
    component: UpdateSeason,
  },
  {
    path: '/seasons/:seasonId/delete',
    name: 'DeleteSeason',
    component: DeleteSeason,
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
    path: '/persons/:personId/update',
    name: 'UpdatePerson',
    component: UpdatePerson,
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
    path: '/playerClasses/:playerClassId/update',
    name: 'UpdatePlayerClasses',
    component: UpdatePlayerClass,
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
    path: '/competitions/:competitionId/update',
    name: 'UpdateCompetition',
    component: UpdateCompetition,
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
