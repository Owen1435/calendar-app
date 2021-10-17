import React from 'react';
import s from './Header.module.scss'
import logo from './assets/img/calendar-icon.png'
import settings from './assets/img/Settings.png'

const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.logo}>
                <img src={logo} alt="icon"/>
                <div className={s.logo__name}>Calendar-app</div>
            </div>
            <div className={s.account}>
                <div className={s.account__login}>Login</div>
                <button className={s.account__settings}>
                    <img src={settings} alt="settings"/>
                </button>
            </div>
        </div>
    );
};

export default Header;