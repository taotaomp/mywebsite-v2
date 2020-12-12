import axios from 'axios'
import { Message,MessageBox } from 'element-ui';
import router from '@/router/index';

const service = axios.create({
    baseURL: "http://localhost:8080",
    timeout:10000
});

service.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token') 
      if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        console.log('add header'+token)
        config.headers.Authorization ='Bearer ' + token  //请求头加上token
      } else {
        router.push({path:'/login'})
      }
      return config
    },
    err => {
      Message({
        type: 'warning',
        message: '添加token失败'
      });
      return Promise.reject(err)
    })

// respone拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // console.log(error)
    // if(error.request){
    //   console.log(error.request)
    // } else if (error.response) {
    //   console.log(error.response.data);
    //   console.log(error.response.status);
    //   console.log(error.response.headers);
    // } 
    if(error && error.response){
      switch (error.response.status) {
        case 400: error.message = '请求错误(400)' ; break;
        case 401: error.message = '未授权，请重新登录(401)';router.push({path:'/login'}); break; 
        case 403: error.message = '拒绝访问(403)'; break;
        case 404: error.message = '请求出错(404)'; break;
        case 408: error.message = '请求超时(408)'; break;
        case 500: error.message = '服务器错误(500)'; break;
        case 501: error.message = '服务未实现(501)'; break;
        case 502: error.message = '网络错误(502)'; break;
        case 503: error.message = '服务不可用(503)'; break;
        case 504: error.message = '网络超时(504)'; break;
        case 505: error.message = 'HTTP版本不受支持(505)'; break;
        default: error.message = '连接出错('+ error.response.status +'!';
      }
    } else {
      error.message = '连接服务器失败!'
    }
    Message({
      type: 'warning',
      message: error.message
    });
    return Promise.reject(error);
  }
)


export default service