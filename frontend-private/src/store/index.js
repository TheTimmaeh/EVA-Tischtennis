import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      token: localStorage.getItem('evat') || null,
    },
  },
  mutations: {
    updateUser(state, user){
      state.user = user
      localStorage.setItem('evat', user.token)
    },
    resetUser(state){
      state.user = {}
      localStorage.removeItem('evat')
    },
  },
  actions: {
    updateUser({ commit }, user){
      commit('updateUser', user)
    },
    resetUser({ commit }){
      commit('resetUser')
    },
  },
})
