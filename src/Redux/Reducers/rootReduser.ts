import {applyMiddleware, combineReducers, createStore} from 'redux'
import {taskReducer} from './taskReduser'
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../Sagas/rootSaga";


export const rootReducer = combineReducers({
    tasks: taskReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>
export default store
