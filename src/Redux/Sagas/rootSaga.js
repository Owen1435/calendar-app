import {all} from "redux-saga/effects"
import {taskWatcher} from "./taskSaga";
import {userWatcher} from "./userSaga";

export default function* rootSaga() {
    yield all([
        taskWatcher(),
        userWatcher()
    ])
}