import {ADD_TASKS, ADD_DATE_WITH_TASKS, MAKE_LOADED, MAKE_UNLOADED} from '../types'

const defaultState = {
    items: [],
    dateWithTasks: [],
    isLoaded: false
}

function taskReducer(state = defaultState, action) {
    switch (action.type) {
        case ADD_TASKS:
            return {...state, items: action.payload}
        case ADD_DATE_WITH_TASKS:
            return {...state, dateWithTasks: [...state.dateWithTasks, action.payload]}
        case MAKE_LOADED:
            return {...state, isLoaded: true}
        case MAKE_UNLOADED:
            return {...state, isLoaded: false}
        default:
            return state
    }
}

export {taskReducer}