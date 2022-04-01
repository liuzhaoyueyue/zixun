import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (store.state.user && store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  (err) => {
    // 请求出错
    return Promise.reject(err)
  }
)
service.interceptors.response.use((res) => {
  return res.data
})

export default service
