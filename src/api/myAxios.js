import { message } from 'antd'
import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const instance = axios.create({
    timeout: 4000
})

instance.interceptors.request.use(function(config) {
    NProgress.start()
    const {method,data} = config
    if (method.toLowerCase() === 'post') {
        if (data instanceof Object) {
            config.data = qs.stringify(data)
        }
    }
    return config
},function(error) {
    return Promise.reject(error)
})

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