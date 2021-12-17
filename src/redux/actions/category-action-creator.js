import {SAVECATEGORYLIST} from '../action_types'

export const createSaveCateList = (value) => {
    return {type: SAVECATEGORYLIST,data: value}
}