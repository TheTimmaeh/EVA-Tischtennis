import axios from 'axios'
import authHeader from './authHeader'

export default () => {
  let options = {}
  options.baseURL = 'http://localhost:3000/'
  options.headers = authHeader()
  let instance = axios.create(options)
  return instance
}
