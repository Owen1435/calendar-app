import React, {useState} from 'react';
import s from "./Login.module.scss";
import axios from "axios";

const Register = () => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')

    async function Register() {

        const res = await axios.post('https://api-nodejs-todolist.herokuapp.com/user/register', {
            name: login,
            password: pass,
            email: email,
        });

        console.log(res.status);
    }

    return (
        <>
            <a href="/calculator">calculator</a>

            <div className={s.loginForm}>
                <div className={s.inputBlock}>
                    <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder='login'/>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='email'/>
                    <input type="text" value={pass} onChange={e => setPass(e.target.value)} placeholder='password'/>
                </div>
                <div className={s.buttons}>
                    <button onClick={Register}>Register</button>
                </div>
            </div>
        </>
    );
};

export default Register;