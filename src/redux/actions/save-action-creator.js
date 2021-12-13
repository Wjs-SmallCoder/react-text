import {SAVETITLE} from '../action_types'

export const createSaveTitle = (value) => {
    return {type: SAVETITLE,data: value}
}