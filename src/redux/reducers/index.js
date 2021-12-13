import loginReducer from './login-reducer'
import saveReducer from './save-reducer'

import { combineReducers } from 'redux'

export default combineReducers({
    loginData: loginReducer,
    title: saveReducer
})