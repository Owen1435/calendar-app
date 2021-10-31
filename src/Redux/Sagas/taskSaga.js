import {takeEvery, call, put} from "redux-saga/effects"
import axios from "axios";
import {
    ADD_DATE_WITH_TASKS,
    ADD_TASK,
    ADD_TASKS,
    COMPLETE_TASK, DELETE_ALL_TASK,
    DELETE_TASK,
    FILL_TASKS,
    MAKE_LOADED,
    MAKE_UNLOADED
} from "../types";
import {compareDate} from "../../DateFunctions.util";

async function getTasksRequest(token) {
    return await axios.get('https://api-nodejs-todolist.herokuapp.com/task',
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
}

async function addTaskRequest(token, date, timeFrom, timeTo, taskText) {
    return await axios.post('https://api-nodejs-todolist.herokuapp.com/task',
        {
            "description": JSON.stringify({
                'date': date.getTime(),
                'timeFrom': timeFrom,
                'timeTo': timeTo,
                'text': taskText
            })
        },
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
}

async function completeTaskRequest(token, task) {
    return await axios.put('https://api-nodejs-todolist.herokuapp.com/task/' + task.id,
        {
            "completed": !task.completed
        },
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
}

async function deleteTaskRequest(token, id) {
    return await axios.delete('https://api-nodejs-todolist.herokuapp.com/task/' + id,
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
}


function* fillTasksWorker(action) {
    const {date, token} = action.payload

    try {
        const response = yield call(getTasksRequest, token)

        const tasks = []
        const allTasks = response.data.data

        for (let i = 0; i < allTasks.length; i++) {
            const item = allTasks[i]

            const object = JSON.parse(item.description)

            const taskDate = new Date(object.date)
            const text = object.text
            const timeFrom = object.timeFrom
            const timeTo = object.timeTo

            if (compareDate(taskDate, date)) {
                tasks.push({id: item._id, text: text, timeFrom: timeFrom, timeTo: timeTo, completed: item.completed})
            }

            yield put({type: ADD_DATE_WITH_TASKS, payload: taskDate})
        }

        // allTasks.forEach((item) => {
        //     const object = JSON.parse(item.description)
        //
        //     const taskDate = new Date(object.date)
        //     const text = object.text
        //     const timeFrom = object.timeFrom
        //     const timeTo = object.timeTo
        //
        //     if (compareDate(taskDate, date)) {
        //         tasks.push({id: item._id, text: text, timeFrom: timeFrom, timeTo: timeTo, completed: item.completed})
        //     }
        //
        //     put({type: ADD_DATE_WITH_TASKS, payload: taskDate})
        // })

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


export function fillTasks(token, date) {
    return {
        type: FILL_TASKS,
        payload: {
            token,
            date,
        }
    }
}

export function addTask(token, date, taskText, timeFrom, timeTo) {
    return {
        type: ADD_TASK,
        payload: {
            token,
            date,
            taskText,
            timeFrom,
            timeTo,
        }
    }
}

export function completeTask(token, date, task) {
    return {
        type: COMPLETE_TASK,
        payload: {
            token,
            date,
            task,
        }
    }
}

export function deleteTask(token, date, id) {
    return {
        type: DELETE_TASK,
        payload: {
            token,
            date,
            id
        }
    }
}

export function deleteAllTask(token, date) {
    return {
        type: DELETE_ALL_TASK,
        payload: {
            token,
            date,
        }
    }
}



//const delay = (ms) => new Promise(res => setTimeout(res, ms))