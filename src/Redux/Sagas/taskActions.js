import {ADD_TASK, COMPLETE_TASK, DELETE_ALL_TASK, DELETE_TASK, FILL_TASKS} from "../types";

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