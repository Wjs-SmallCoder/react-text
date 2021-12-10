import axios from 'axios'
import qs from 'querystring' // querystring 本来是一个npm 包，但是react 里面包含不需要再次下载 
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'

// 生成一个axios 实例
const instance = axios.create({
    timeout: 4000
})

// 使用拦截器(请求)
instance.interceptors.request.use(function(config) {
    NProgress.start() // 启用进度条
    const {method,data} = config
    if (method.toLowerCase() === 'post') {
        if (data instanceof Object) {
            // 将obj 转化为string
            config.data = qs.stringify(data)
        }
    }
    return config
},function(error) {
    return Promise.reject(error)
})

// 使用拦截器(响应)
instance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        message.error(error.message,1)
        return new Promise(() => {})
    }
)

export default instance