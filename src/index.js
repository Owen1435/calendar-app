import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Provider} from "react-redux";
import {createStore} from "redux";

const defaultState = []

//action = {type: '', payload: ''}
const reducer = (state = defaultState, action) => {
    switch (action.type) {

        default:
            return state
    }
}

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));