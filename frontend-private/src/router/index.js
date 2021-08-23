import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'


//Associations
const Associations = {
  Index: () => import('../views/Associations/Index.vue'),
  Get: () => import('../views/Associations/Get.vue'),
  Create: () => import('../views/Associations/Create.vue'),
  Update: () => import('../views/Associations/Update.vue'),
  Delete: () => import('../views/Associations/Delete.vue'),
  Profile: () => import('../views/Associations/Profile.vue'),
  Members: () => import('../views/Associations/Members.vue'),
  MembersDelete: () =>import('../views/Associations/MemberDelete.vue'),
  Teams: {
    Index: () => import('../views/Associations/Teams/Index.vue'),
    Get: () => import('../views/Associations/Teams/Get.vue'),
    Create: () => import('../views/Associations/Teams/Create.vue'),
    Update:() => import('../views/Associations/Teams/Update.vue'),
    Delete: () => import('../views/Associations/Teams/Delete.vue'),
    LineUp:() => import('../views/Associations/Teams/LineUp.vue'),
    LineUpCreate:() => import('../views/Associations/Teams/LineUpCreate.vue'),
    LineUpUpdate:() => import('../views/Associations/Teams/LineUpUpdate.vue'),
  },
}

// Persons
const Persons = () => import('../views/Persons/Index.vue')
const CreatePerson = () => import('../views/Persons/Create.vue')
const UpdatePerson = () => import('../views/Persons/Update.vue')
const ProfilePerson = () => import('../views/Persons/Profile.vue')

// Admin (Users/Seasons/PlayerClasses)
const Admin = {
  Get: () => import('../views/Admin/Get.vue'),
  Components: () => import('../views/Admin/Components.vue'),
  Users: {
    Index: () => import('../views/Admin/Users/Index.vue'),
    Create: () => import('../views/Admin/Users/Create.vue'),
    Update: () => import('../views/Admin/Users/Update.vue'),
    // Delete: () => import('../views/Admin/Users/Delete.vue'),
  },
  Seasons: {
    Index: () => import('../views/Admin/Seasons/Index.vue'),
    Create: () => import('../views/Admin/Seasons/Create.vue'),
    Update: () => import('../views/Admin/Seasons/Update.vue'),
    Delete: () => import('../views/Admin/Seasons/Delete.vue'),
  },
  PlayerClasses: {
    Index: () => import('../views/Admin/PlayerClasses/Index.vue'),
    Create: () => import('../views/Admin/PlayerClasses/Create.vue'),
    Update: () => import('../views/Admin/PlayerClasses/Update.vue'),
    Delete: () => import('../views/Admin/PlayerClasses/Delete.vue'),
  },
}

// Competitions
const Competitions = {
  Index: () => import('../views/Competitions/Index.vue'),
  Get: () => import('../views/Competitions/Get.vue'),
  Create: () => import('../views/Competitions/Create.vue'),
  Delete: () => import('../views/Competitions/Delete.vue'),
  Update: () => import('../views/Competitions/Update.vue'),
  Profile: () => import('../views/Competitions/Profile.vue'),
  Encounters: {
    Index: () => import('../views/Competitions/Encounters/Index.vue'),
    Create: () => import('../views/Competitions/Encounters/Create.vue'),
    Update: () => import('../views/Competitions/Encounters/Update.vue'),
    Delete: () => import('../views/Competitions/Encounters/Delete.vue'),
  },
  Match: {
    Index: () => import('../views/Competitions/Encounters/Match/Index.vue'),
    Update: () => import('../views/Competitions/Encounters/Match/Update.vue'),
    Delete: () => import('../views/Competitions/Encounters/Match/Delete.vue'),
    Match: () => import('../views/Competitions/Encounters/Match/Match.vue')
  },
  Teams: () => import('../views/Competitions/Teams.vue'),
}


//Login and Logout
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
    path: '/associations/:associationId',
    name: 'Association',
    component: Associations.Get,
    children: [
      {
        path: '',
        component: Associations.Profile,
      },
      {
        path: 'update',
        component: Associations.Update,
      },
      {
        path: 'delete',
        component: Associations.Delete,
      },
      {
        path: 'members',
        component: Associations.Members,
      },
      {
        path: 'members/delete',
        component: Associations.MembersDelete,
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
        path: 'teams/:teamId/delete',
        component: Associations.Teams.Delete,
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
    path: '/persons/:personId/profile',
    name: 'ProfilePerson',
    component: ProfilePerson,
  },
  {
    path: '/competitions',
    name: 'Competitons',
    component: Competitions.Index,
  },
  {
    path: '/competitions/create',
    name: 'CreateCompetiton',
    component: Competitions.Create,
  },

  {
    path: '/competitions/:competitionId',
    name: 'Competition',
    component: Competitions.Get,
    children: [
      {
        path: '',
        component: Competitions.Profile,
      },
      {
        path: 'delete',
        name: 'DeleteCompetiton',
        component: Competitions.Delete,
      },
      {
        path: 'update',
        name: 'UpdateCompetition',
        component: Competitions.Update,
      },
      {
        path: 'encounters',
        component: Competitions.Encounters.Index,
      },
      {
        path: 'encounters/create',
        component: Competitions.Encounters.Create,
      },
      {
        path: 'encounters/:encounterId/delete',
        component: Competitions.Encounters.Delete,
      },
      {
        path: 'encounters/:encounterId/update',
        component: Competitions.Encounters.Update,
      },
      {
        path: 'encounters/:encounterId/matches',
        component: Competitions.Match.Index,
      },
      {
        path: 'encounters/:encounterId/matches/:matchId/update',
        component: Competitions.Match.Update,
      },
      {
        path: 'encounters/:encounterId/matches/:matchId/delete',
        component: Competitions.Match.Delete,
      },
      {
        path: 'encounters/:encounterId/matches/:matchId',
        component: Competitions.Match.Match,
      },
      {
        path: 'teams',
        component: Competitions.Teams,
      },
    ]
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
  {
    path: '/admin',
    name: 'Admin',
    component: Admin.Get,
    children: [
      {
        path: 'components',
        name: 'Components',
        component: Admin.Components,
      },
      {
        path: 'users',
        name: 'Users',
        component: Admin.Users.Index,
      },
      {
        path: 'users/create',
        name: 'CreateUser',
        component: Admin.Users.Create,
      },
      {
        path: 'users/:userId/update',
        name: 'UpdateUser',
        component: Admin.Users.Update,
      },
      {
        path: 'seasons',
        name: 'Seasons',
        component: Admin.Seasons.Index,
      },
      {
        path: 'seasons/create',
        name: 'CreateSeason',
        component: Admin.Seasons.Create,
      },
      {
        path: 'seasons/:seasonId/update',
        name: 'UpdateSeason',
        component: Admin.Seasons.Update,
      },
      {
        path: 'seasons/:seasonId/delete',
        name: 'DeleteSeason',
        component: Admin.Seasons.Delete,
      },
      {
        path: 'playerClasses',
        name: 'PlayerClasses',
        component: Admin.PlayerClasses.Index,
      },
      {
        path: 'playerClasses/create',
        name: 'CreatePlayerClass',
        component: Admin.PlayerClasses.Create,
      },
      {
        path: 'playerClasses/:playerClassId/update',
        name: 'UpdatePlayerClasses',
        component: Admin.PlayerClasses.Update,
      },
      {
        path: 'playerClasses/:playerClassId/delete',
        name: 'DeletePlayerClasses',
        component: Admin.PlayerClasses.Delete,
      },
    ],
  },
]

const whitelist = {
  exact: [
    '/',
    '/login',
    '/publicsocket',
  ],
  startsWith: [
    '/competitions',
    '/associations',
    '/persons',
  ]
}

const blacklist = {
  endsWith: [
    '/create',
    '/update',
    '/delete',
  ],
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  let publicRoute = false

  if(whitelist?.exact?.includes(to.path)) publicRoute = true
  else if(whitelist.startsWith){
    publicRoute = !!whitelist?.startsWith?.find((r) => to.path.startsWith(r))
  }

  if(blacklist?.exact?.includes(to.path)) publicRoute = false
  else if(blacklist.endsWith){
    publicRoute = !blacklist?.endsWith?.find((r) => to.path.endsWith(r))
  }

  if(!publicRoute && !store?.state?.user?.token) return next('/login')

  next()
})

export default router
