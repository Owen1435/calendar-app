import axios from "axios";

export async function getTasksRequest(token) {
    return await axios.get('https://api-nodejs-todolist.herokuapp.com/task',
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
}

export async function addTaskRequest(token, date, timeFrom, timeTo, taskText) {
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

export async function completeTaskRequest(token, task) {
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

export async function deleteTaskRequest(token, id) {
    return await axios.delete('https://api-nodejs-todolist.herokuapp.com/task/' + id,
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
}