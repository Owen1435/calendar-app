import React, {useEffect, useState} from 'react';
import s from './Header.module.scss'
import logo from './assets/img/calendar-icon.png'
import settings from './assets/img/Settings.png'
import axios from "axios";
import {Tooltip} from "@mui/material";
import {useHistory} from "react-router-dom";

const Header = ({curDate, token}) => {
    let history = useHistory();
    const [user, setUser] = useState()
    useEffect(getUser,[token])

    async function getUser() {
        const res = await axios.get('https://api-nodejs-todolist.herokuapp.com/user/me',
            {
                headers: {Authorization: 'Bearer ' + token}
            });

        console.log(res.status);
        console.log(res.data);
        setUser(res.data)
    }

    function Logout() {
        sessionStorage.setItem('token', '');
        history.push('/')
    }

    return (
        <div className={s.header}>
            <div className={s.logo}>
                <img src={logo} alt="icon"/>
                <div className={s.logo__name}>Calendar-app</div>
            </div>
            <div className={s.today}>{`Today: ${curDate.getDate()}.${curDate.getMonth() + 1}.${curDate.getFullYear()}`}</div>
            <div className={s.account}>
                <Tooltip title="Logout">
                    <button className={s.userData} onClick={Logout}>{user?.email}</button>
                </Tooltip>
                <button className={s.account__settings}>
                    <img src={settings} alt="settings"/>
                </button>
            </div>
        </div>
    );
};

export default Header;