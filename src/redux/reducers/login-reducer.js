import {SAVEUSER,DELETEUSER} from '../action_types'

let user = JSON.parse(localStorage.getItem('user')) // 拿到本地保存的user 转为obj
let token = localStorage.getItem('token') // 拿到本地保存的user 转为obj
let initState = {
    user: user || '',
    token: token || '',
    isLogin: user && token ? true : false
}

export default function test(preState=initState,action) {
    let newState
    const {type,data} = action
    switch (type) {
        case SAVEUSER:
            newState = {user: data.user,token:data.token,isLogin:true}
            return newState

        case DELETEUSER:
            newState = {user: '',token:'',isLogin:false}
            return newState
    
        default:
            return preState
    }
}