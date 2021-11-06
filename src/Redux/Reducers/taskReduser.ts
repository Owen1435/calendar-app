import {ADD_TASKS, SET_DATES_WITH_TASKS, MAKE_LOADED, MAKE_UNLOADED} from '../types'
import {UserState, UserAction} from "./taskTypes"

const defaultState: UserState = {
    items: [],
    dateWithTasks: [],
    isLoaded: false
}

function taskReducer(state = defaultState, action: UserAction): UserState {
    switch (action.type) {
        case ADD_TASKS:
            return {...state, items: action.payload}
        case SET_DATES_WITH_TASKS:
            return {...state, dateWithTasks: action.payload}
        case MAKE_LOADED:
            return {...state, isLoaded: true}
        case MAKE_UNLOADED:
            return {...state, isLoaded: false}
        default:
            return state
    }
}

export {taskReducer}