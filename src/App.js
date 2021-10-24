import './App.scss';
import {BrowserRouter, Route} from "react-router-dom"
import Calendar from "./Components/Calendar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import React, {useState} from "react";
import TestComp from "./TestComp";

function App() {
    const [token, setToken] = useState(sessionStorage.getItem('token'))


    const [_id, setId] = useState(1)
    const [list, setList] = useState([{id: _id, content: 0}])
    //const [curValue, setCurValue] = useState(list[0])
    let curValue = list[0]
    console.log('curValue  ' + curValue.id)

    function addList() {
        //console.log('before  ' + _id)
        const newId = _id + 1
        setId(newId)
        //console.log('after  ' + _id)
        const newList = {id: newId, content: 0}
        setList([...list, newList])
    }

    function setCurValue(id) {
        curValue = list.find((i) => i.id === id)
    }

    return (
        <div>
            <button onClick={() => addList()}>addList</button>

            <TestComp curValue={curValue} setCurValue={setCurValue}/>
        </div>
        // <BrowserRouter>
        //     <Route exact path='/'>
        //         <Login token={token} setToken={setToken}/>
        //     </Route>
        //     <Route exact path='/calculator'>
        //         {token
        //             ? <Calendar token={token}/>
        //             : <Login token={token} setToken={setToken}/>
        //         }
        //     </Route>
        //     <Route exact path='/register'>
        //         <Register/>
        //     </Route>
        // </BrowserRouter>
    );
}

export default App;
