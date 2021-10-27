import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import './index.scss';
import App from './App';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {rootReducer} from './Redux/rootReduser'
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));