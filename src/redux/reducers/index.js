// 这里的值将被当作props 传递(因为在index.js 里面是通过props 传递(标签内添加属性被传递) ) 

import loginReducer from './login-reducer'
import saveReducer from './save-reducer'
import prodReducer from './prod-reducer'
import categoryReducer from './category-reducer'

import { combineReducers } from 'redux'

export default combineReducers({
    loginData: loginReducer,
    title: saveReducer,
    prodList: prodReducer,
    categoryList: categoryReducer
})