import {FILL_TASKS, ADD_DATE_WITH_TASKS} from './types'
import axios from "axios";
import {compareDate} from "../DateFunctions.util.js";

export function addTask(token, date, taskText) {
    return async function (dispatch) {
        const response = await axios.post('https://api-nodejs-todolist.herokuapp.com/task',
            {
                "description": JSON.stringify({'date': date.getTime(), 'text': taskText})
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

        console.log('addTask: ' + response.statusText);

        dispatch(fillTasks(token, date))
    }
}

export function deleteTask(token, date, id) {
    return async function (dispatch) {
        const response = await axios.delete('https://api-nodejs-todolist.herokuapp.com/task/' + id,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
        console.log('deletePost: ' + response.statusText);

        dispatch(fillTasks(token, date))
    }
}

export function completeTask(token, date, task) {
    return async function (dispatch) {
        const response = await axios.put('https://api-nodejs-todolist.herokuapp.com/task/' + task.id,
            {
                "completed": !task.completed
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
        console.log('completeTask: ' + response.statusText);

        dispatch(fillTasks(token, date))
    }
}

export function deleteAllTask(token, date) {
    return async function (dispatch) {
        const response = await axios.get('https://api-nodejs-todolist.herokuapp.com/task',
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

        response.data.data.forEach((item) => {
            console.log('Remove: ' + item._id)
            dispatch(deleteTask(token, date, item._id))
        })
    }
}

export function fillTasks(token, selectedDate) {
    return async function (dispatch) {
        const response = await axios.get('https://api-nodejs-todolist.herokuapp.com/task',
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
        console.log('fillTasks: ' + response.statusText);

        const tasks = []
        response.data.data.forEach((item) => {
            const object = JSON.parse(item.description)

            const date = new Date(object.date)
            const text = object.text

            if (compareDate(date, selectedDate)) {
                tasks.push({id: item._id, text: text, completed: item.completed})
            }

            dispatch({type: ADD_DATE_WITH_TASKS, payload: date})
        })

        dispatch({type: FILL_TASKS, payload: tasks})
    }
}