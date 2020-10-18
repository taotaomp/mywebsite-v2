import axios from 'axios'

const service = axios.create({
    baseURL: "http://localhost:8080",
    timeout:10000
});

service.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token') 
      if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        console.log('add header')
        config.headers.Authorization ='Bearer ' + token  //请求头加上token
      }
      return config
    },
    err => {
      return Promise.reject(err)
    })

export default service