import {applyMiddleware, combineReducers, createStore} from 'redux'
import {taskReducer} from './taskReduser'
import {userReducer} from './userReducer'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    tasks: taskReducer,
    user: userReducer
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)