import axios from 'axios'
import { BASE_URL } from './constants/APIs'
import { loggedIn, getToken, removeToken } from './utils/auth'
import { goLoginPage } from './utils/locationUtils'

axios.defaults.baseURL = BASE_URL

// http request 拦截器 用于给 request 的 header 添加 token
axios.interceptors.request.use(
  config => {
    if (loggedIn) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  })

// http response 拦截器 主要用途在于拦截token失效时，后端返回401的情况
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          removeToken()
          goLoginPage()
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  });

export default axios

