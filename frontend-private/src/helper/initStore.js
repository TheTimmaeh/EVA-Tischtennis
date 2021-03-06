import store from '@/store'
import axios from './axios'

export default () => {
  let token = localStorage.getItem('evat')

  if(token){
    axios().post('/auth/validate').then((res) => {
      if(!res.data){
        console.error('Unknown error', res.data)
      } else if(!res.data.success){
        localStorage.removeItem('evat')
      } else {
        store.dispatch('updateUser', {token, ...res.data.user})
      }
    }).catch((err) => {
      console.error(err)

      if(err.response.data && !err.response.data.success) localStorage.removeItem('evat')
    })
  }
}
