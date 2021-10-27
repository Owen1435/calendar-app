import {combineReducers} from 'redux'
import {taskReducer} from './taskReduser'
import {userReducer} from './userReducer'

export const rootReducer = combineReducers({
    tasks: taskReducer,
    user: userReducer
})