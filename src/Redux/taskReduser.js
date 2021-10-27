import {FILL_TASKS} from './types'

function taskReducer(state = [], action) {
    switch (action.type) {
        case FILL_TASKS:
            return action.payload
        default:
            return state
    }
}

export {taskReducer}