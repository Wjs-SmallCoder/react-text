import {SAVECATEGORYLIST} from '../action_types'

let initState = '' // 初始化

export default function test(preState=initState,action) {
    let newState
    const {type,data} = action
    switch (type) {
        case SAVECATEGORYLIST:
            newState = data
            return newState

        default:
            return preState
    }
}