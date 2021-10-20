import './App.scss';
import {BrowserRouter, Route} from "react-router-dom"
import Calendar from "./Components/Calendar";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {


    return (
        <>
            <BrowserRouter>
                <Route exact path='/'>
                    <Login/>
                </Route>
                <Route exact path='/calculator'>
                    <Header/>
                    <Calendar/>
                </Route>
                <Route exact path='/register'>
                    <Register/>
                </Route>
            </BrowserRouter>
        </>
    );
}

export default App;
