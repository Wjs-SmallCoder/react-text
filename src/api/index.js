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

// 添加商品请求
export const reqAddCategory = ({categoryName}) => myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})

// 修改商品请求 
export const reqUpdateCategory = ({categoryId,categoryName}) => myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})

// 请求商品分页列表
export const reqProductList = (pageNum,pageSize) => myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})

// 更新商品在售状态
export const reqUpdateProdStatus = (productId,status) => myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status})

// 搜索商品
export const reqSearchProduct = (pageNum,pageSize,searchType,keyword) => myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyword}})
