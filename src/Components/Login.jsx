import React, {useState} from 'react';
import s from './Login.module.scss'
import axios from "axios";
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";


const Login = ({token, setToken}) => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    let history = useHistory();

    async function Login() {
        const res = await axios.post('https://api-nodejs-todolist.herokuapp.com/user/login', {
            password: '123456789',
            email: 'asfdghj234werdsq@mail.ru',
        });

        sessionStorage.setItem('token', res.data.token);
        setToken(res.data.token)

        history.push('/calculator')
    }

    // const [user, setUser] = useState({})
    //
    // async function getUser() {
    //     const axios = require('axios');
    //
    //     const res = await axios.get('https://api-nodejs-todolist.herokuapp.com/user/me',
    //         {
    //             headers: {Authorization: 'Bearer ' + token}
    //         });
    //
    //     console.log(res.status);
    //     console.log(res.data);
    //     setUser(res.data)
    // }
    //
    // async function addPost() {
    //     const axios = require('axios');
    //
    //     const res = await axios.post('https://api-nodejs-todolist.herokuapp.com/task',
    //         {
    //             "description": 'AaAaAaaAaAaAaaaaAa'
    //         },
    //         {
    //             headers: {
    //                 'Authorization': 'Bearer ' + token,
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //
    //     console.log(res.status);
    //     setUser(res.data)
    // }
    //
    // async function getPosts() {
    //
    //     const res = await axios.get('https://api-nodejs-todolist.herokuapp.com/task',
    //         {
    //             headers: {
    //                 'Authorization': 'Bearer ' + token,
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //
    //     console.log(res.status);
    //     setUser(res.data)
    // }

    return (
        <>
            <a href={"/calculator"}>calculator</a>

            <div className={s.loginForm}>
                <div className={s.title}>LOGIN FORM</div>

                <div className={s.inputBlock}>
                    <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder='login(email)'/>
                    <input type="text" value={pass} onChange={e => setPass(e.target.value)} placeholder='password'/>
                </div>

                <div className={s.buttons}>
                    {/*<button onClick={Login}>Sign in</button>*/}
                    <Button variant="contained" onClick={Login}>Sign in</Button>
                    <a href={"/register"}>Register</a>

                    {/*<div>{user['_id']}</div>*/}
                    {/*<button onClick={getUser}>getUser</button>*/}
                    {/*<button onClick={addPost}>addPost</button>*/}
                    {/*<button onClick={getPosts}>getPosts</button>*/}
                </div>
            </div>
        </>
    );
};

export default Login;