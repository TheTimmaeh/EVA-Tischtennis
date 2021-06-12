import axios from 'axios'
import authHeader from './authHeader'

const options = {
  baseURL: 'http://localhost:3000/',
  headers: authHeader(),
}

const axiosInstance = axios.create(options)

const parseRequests = (requests) => {
  const pattern = /(?:(GET|POST|DELETE|PUT|PATCH)\s*)?(.+)/
  if(!(requests instanceof Array)) requests = [requests]

  requests = requests.map((r) => {
    if(typeof r === 'string'){
      let [match, method, url] = pattern.exec(r) || []

      if(!match) return null
      if(!method) method = 'GET'

      return { method, url }
    }

    if(r instanceof Object){
      if(!r.path) return null

      let request = {
        method: r.method || 'GET',
        url: r.path || r.url,
      }

      if(r.data instanceof Object){
        if(request.method.toUpperCase() === 'POST') request.data = r.data
        else if(request.method.toUpperCase() === 'GET') request.params = r.data
      }

      return request
    }
  }).filter((r) => r)

  return requests
}

const api = async (requests) => {
  requests = parseRequests(requests)

  if(requests.length == 1) return await axiosInstance(requests[0])

  return await Promise.all(requests.map((r) => axiosInstance(r)))
}

export default api
