import React, {useState} from 'react';
import s from "./Login.module.scss";
import axios from "axios";
import {Button} from "@mui/material";

const RegisterPage = () => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')

    async function Register() {
        await axios.post('https://api-nodejs-todolist.herokuapp.com/user/register', {
            name: login,
            password: pass,
            email: email,
        });
    }

    return (
        <>
            <a href={"/calendar"}>calendar</a>

            <div className={s.loginForm}>
                <div className={s.title}>REGISTER FORM</div>
                <div className={s.inputBlock}>
                    <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder='login'/>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='email'/>
                    <input type="text" value={pass} onChange={e => setPass(e.target.value)} placeholder='password'/>
                </div>
                <div className={s.buttons}>
                    <Button variant="contained" onClick={Register}>Register</Button>
                    <a href={"/"}>Login</a>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;