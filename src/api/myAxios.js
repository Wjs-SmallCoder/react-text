import axios from 'axios'
import qs from 'querystring' // querystring 本来是一个npm 包，但是react 里面包含不需要再次下载 
import NProgress from 'nprogress' // 进度条
import store from '../redux/store'
import {createDeleteUser} from '../redux/actions/login-action-creator'
import 'nprogress/nprogress.css'
import { message } from 'antd'

// 生成一个axios 实例
const instance = axios.create({
    timeout: 10000
})

// 使用拦截器(请求)
instance.interceptors.request.use(function(config) {
    NProgress.start() // 启用进度条
    const {token} = store.getState().loginData
    if (token) {
        config.headers.Authorization = 'atguigu_' + token
    }
    const {method,data} = config
    if (method.toLowerCase() === 'post') {
        if (data instanceof Object) {
            // 将obj 转化为string
            config.data = qs.stringify(data)
        }
    }
    return config
},function(error) {
    NProgress.done()
    return Promise.reject(error)
})

// 使用拦截器(响应)
instance.interceptors.response.use(
    (response) => {
        NProgress.done()
        return response.data
    },
    (error) => {
        NProgress.done()
        if (error.response.status === 401) {
            message.error('身份验证失败，请重新登录',1)
            // 通过引入store 和action，使用axtion 的 dispatch(请求) 来操作 reducer 
            store.dispatch(createDeleteUser())
        }
        message.error(error.message,1)
        return new Promise(() => {})
    }
)

export default instance