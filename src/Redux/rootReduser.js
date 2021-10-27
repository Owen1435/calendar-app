import {combineReducers} from 'redux'
import {taskReduser} from './taskReduser'

export const rootReducer = combineReducers({
    task: taskReduser
})