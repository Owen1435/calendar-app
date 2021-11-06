import {call, takeEvery} from "redux-saga/effects";
import {LOGIN} from "../types";
import axios from "axios";

async function loginRequest(email, password) {
    return await axios.post('https://api-nodejs-todolist.herokuapp.com/user/login', {
        password: password,
        email: email,
    });
}

function* loginWorker(action) {
    const {email, password} = action.payload

    try {
        const response = yield call(loginRequest, email, password)
        const token = response.data.token
        sessionStorage.setItem('token', token);
    } catch (error) {
        console.log(error)
    }
}

export function* userWatcher() {
    yield takeEvery(LOGIN, loginWorker)
}

export function login(email, password) {
    return {
        type: LOGIN,
        payload: {
            email,
            password,
        }
    }
}