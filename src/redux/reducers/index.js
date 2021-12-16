import loginReducer from './login-reducer'
import saveReducer from './save-reducer'
import prodReducer from './prod-reducer'

import { combineReducers } from 'redux'

export default combineReducers({
    loginData: loginReducer,
    title: saveReducer,
    prodList: prodReducer
})