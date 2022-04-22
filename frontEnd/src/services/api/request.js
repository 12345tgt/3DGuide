import axios from 'axios'

import {HOST, PORT} from '../../config'

export default function(config) {
  const instance = axios.create({
    baseURL: `${HOST}:${PORT}`,
    timeout: 5000
  })

  instance.interceptors.response.use((res)=> {
    return res.data
  }, err=> {
    return Promise.reject(err)
  })

  return instance(config)
}