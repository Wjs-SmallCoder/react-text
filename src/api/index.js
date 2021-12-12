// import axios from 'axios'
import myAxios from './myAxios'
import {BASE_URL} from '../config'
import {CITY,MYPRIKEY} from '../config'
import jsonp from 'jsonp'
import { message } from 'antd'

// 登录请求
export const reqLogin = (username,password) => myAxios.post(`${BASE_URL}/login`,{username,password})

// 获取商品请求
export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`)

// 天气接口请求
export const reqWeather = () => {
        return new Promise((resolve,reject) => {
            jsonp(`https://api.map.baidu.com/weather/v1/?district_id=${CITY}&data_type=now&ak=${MYPRIKEY}`,(err,data) => {
                if(err) {
                    message.error('请求天气接口失败，请练习管理员')
                    return new Promise(() => {})
                } else {
                    // const {dayPictureUrl,temperature,weather} = data.resules[0].weather_data[0]
                    // let weatherObj = {dayPictureUrl,temperature,weather}
                    resolve(data)
                }
            })
        })
}       