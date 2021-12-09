import {SAVEUSER,DELETEUSER} from '../action_types'

export const createSaveUser = (value) => {
    localStorage.setItem('user',JSON.stringify(value.user)) // 保存状态，保证页面刷新不会清理state
    localStorage.setItem('token',value.token) // 保存状态，保证页面刷新不会清理state
    localStorage.setItem('isLogin',true) // 保存状态，保证页面刷新不会清理state
    return {type: SAVEUSER,data: value}
}
export const createDeleteUser = (value) => {
    localStorage.removeItem('user') // 保存状态，保证页面刷新不会清理state
    localStorage.removeItem('token') // 保存状态，保证页面刷新不会清理state
    return {type: DELETEUSER}
}

export const createTextAsync = (value,delay) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createSaveUser(value))
        },delay)
    }
}