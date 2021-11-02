import {
    SET_DATES_WITH_TASKS,
    ADD_TASK,
    ADD_TASKS,
    COMPLETE_TASK, DELETE_ALL_TASK,
    DELETE_TASK,
    FILL_TASKS,
    MAKE_LOADED,
    MAKE_UNLOADED
} from "../types";
import {takeEvery, call, put} from "redux-saga/effects"
import {fillTasks, deleteTask} from "./taskActions";
import {getTasksRequest, addTaskRequest, deleteTaskRequest, completeTaskRequest} from "./taskRequest";
import {handleTasks} from "../../Utils/taskHandler.util";

function* fillTasksWorker(action) {
    const {date, token} = action.payload

    try {
        const response = yield call(getTasksRequest, token)

        const {tasks, dateWithTasks} = handleTasks(response.data.data, date)

        yield put({type: SET_DATES_WITH_TASKS, payload: dateWithTasks})
        yield put({type: ADD_TASKS, payload: tasks})
        yield put({type: MAKE_LOADED})
    } catch (error) {
        console.log(error)
    }
}

function* addTaskWorker(action) {
    const {token, date, taskText, timeFrom, timeTo} = action.payload

    yield put({type: MAKE_UNLOADED})
    try {
        yield call(addTaskRequest, token, date, timeFrom, timeTo, taskText)
    } catch (error) {
        console.log(error)
    }
    yield put(fillTasks(token, date))
}

function* completeTaskWorker(action) {
    const {token, date, task} = action.payload

    yield put({type: MAKE_UNLOADED})
    try {
        yield call(completeTaskRequest, token, task)
    } catch (error) {
        console.log(error)
    }
    yield put(fillTasks(token, date))
}

function* deleteTaskWorker(action) {
    const {token, date, id} = action.payload

    yield put({type: MAKE_UNLOADED})
    try {
        yield call(deleteTaskRequest, token, id)
    } catch (error) {
        console.log(error)
    }
    yield put(fillTasks(token, date))
}

function* deleteAllTaskWorker(action) {
    const {token, date} = action.payload

    yield put({type: MAKE_UNLOADED})
    try {
        const response = yield call(getTasksRequest, token)
        const allTasks = response.data.data

        for (let i = 0; i < allTasks.length; i++) {
            const item = allTasks[i]

            console.log('Remove: ' + item._id)
            yield put(deleteTask(token, date, item._id))
        }
    } catch (error) {
        console.log(error)
    }
}


export function* taskWatcher() {
    yield takeEvery(FILL_TASKS, fillTasksWorker)
    yield takeEvery(ADD_TASK, addTaskWorker)
    yield takeEvery(COMPLETE_TASK, completeTaskWorker)
    yield takeEvery(DELETE_TASK, deleteTaskWorker)
    yield takeEvery(DELETE_ALL_TASK, deleteAllTaskWorker)
}