import './App.scss';
import {BrowserRouter, Route} from "react-router-dom"
import Calendar from "./Components/Calendar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import React, {useState} from "react";
import TestComp from "./TestComp";

function App() {
    const [token, setToken] = useState(sessionStorage.getItem('token'))

    return (
        <BrowserRouter>
            <Route exact path='/'>
                <Login token={token} setToken={setToken}/>
            </Route>
            <Route exact path='/calculator'>
                {token
                    ? <Calendar token={token}/>
                    : <Login token={token} setToken={setToken}/>
                }
            </Route>
            <Route exact path='/register'>
                <Register/>
            </Route>
        </BrowserRouter>
    );
}

export default App;
