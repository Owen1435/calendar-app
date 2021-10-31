import {all} from "redux-saga/effects"
import {taskWatcher} from "./taskSaga";

export default function* rootSaga() {
    yield all([
        taskWatcher()
    ])
}