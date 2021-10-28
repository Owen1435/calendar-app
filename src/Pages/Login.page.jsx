import React, {useState} from 'react';
import s from '../Components/Login.module.scss'
import axios from "axios";
import {Button} from "@mui/material";
import {useHistory} from "react-router-dom";

const LoginPage = ({token, setToken}) => {
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

        history.push('/calendar')
    }

    return (
        <>
            <a href={"/calendar"}>calendar</a>

            <div className={s.loginForm}>
                <div className={s.title}>LOGIN FORM</div>

                <div className={s.inputBlock}>
                    <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder='login(email)'/>
                    <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder='password'/>
                </div>

                <div className={s.buttons}>
                    <Button variant="contained" onClick={Login}>Sign in</Button>
                    <a href={"/register"}>Register</a>
                </div>
            </div>
        </>
    );
};

export default LoginPage;