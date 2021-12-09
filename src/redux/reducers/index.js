import loginReducer from './login-reducer'

import { combineReducers } from 'redux'

export default combineReducers({
    loginData: loginReducer
})