import './App.scss';
import {BrowserRouter, Route} from "react-router-dom"
import React, {useState} from "react";
import MainPage from "./Pages/Main.page";
import LoginPage from "./Pages/Login.page";
import RegisterPage from "./Pages/Register.page";

function App() {
    const [token, setToken] = useState(sessionStorage.getItem('token'))

    return (
        <BrowserRouter>
            <Route exact path='/'>
                <LoginPage token={token} setToken={setToken}/>
            </Route>
            <Route exact path='/calendar'>
                {token
                    ? <MainPage token={token}/>
                    : <LoginPage token={token} setToken={setToken}/>
                }
            </Route>
            <Route exact path='/register'>
                <RegisterPage/>
            </Route>
        </BrowserRouter>
    );
}

export default App;
