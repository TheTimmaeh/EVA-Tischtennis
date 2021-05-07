import store from '@/store'
import initStore from './initStore'

export default () => {

  // Token in Vuex
  if(store.state && store.state.user && store.state.user.token) return { 'Authorization': `Bearer ${store.state.user.token}` }

  // Token in LocalStorage
  if(localStorage.getItem('evat')){
    //initStore()
    return { 'Authorization': `Bearer ${localStorage.getItem('evat')}` }
  }

  // No Token
  return {}
}
