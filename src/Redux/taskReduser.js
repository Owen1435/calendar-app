import {FILL_TASKS, ADD_DATE_WITH_TASKS} from './types'

const defaultState = {
    items: [],
    dateWithTasks: []
}

function taskReducer(state = defaultState, action) {
    switch (action.type) {
        case FILL_TASKS:
            return {...state, items: action.payload}
        case ADD_DATE_WITH_TASKS:
            return {...state, dateWithTasks: [...state.dateWithTasks, action.payload]}
        default:
            return state
    }
}

export {taskReducer}