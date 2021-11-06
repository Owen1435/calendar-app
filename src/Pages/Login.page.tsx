import React, {FC, useState} from 'react';
import s from './Login.module.scss'
import axios from "axios";
import {Button, Checkbox} from "@mui/material";
import {useHistory} from "react-router-dom";

export interface IUser {
    _id: string
    age: number
    name: string
    email: string
}

interface LoginRequest {
    token: string
    user: IUser
}

interface LoginPageProps {
    setToken: React.Dispatch<string>
}

const LoginPage: FC<LoginPageProps> = ({setToken}) => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [checked, setChecked] = useState(true);
    let history = useHistory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    async function Login() {
        const password = checked ? '123456789' : pass
        const email = checked ? 'asfdghj234werdsq@mail.ru' : login

        const res = await axios.post<LoginRequest>('https://api-nodejs-todolist.herokuapp.com/user/login', {
            password: password,
            email: email,
        });

        sessionStorage.setItem('token', res.data.token);
        setToken(res.data.token)

        history.push('/calendar')
    }

    return (
        <>
            <div className={s.loginForm}>
                <div className={s.title}>LOGIN FORM</div>

                <div className={s.inputBlock}>
                    <input type="text" value={login} onChange={e => setLogin(e.target.value)}
                           placeholder='login(email)'/>
                    <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder='password'/>
                    <div className={s.checkbox}>
                        <Checkbox checked={checked} onChange={handleChange}/>
                        <span>Sign in like admin</span>
                    </div>
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