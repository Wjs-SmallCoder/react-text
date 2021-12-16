import {SAVEPRODLIST} from '../action_types'

export const createSaveProdList = (value) => {
    return {type: SAVEPRODLIST,data: value}
}