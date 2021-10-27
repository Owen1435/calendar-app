import React, {useEffect} from 'react';
import s from './Header.module.scss'
import logo from './assets/img/calendar-icon.png'
import settings from './assets/img/Settings.png'
import axios from "axios";
import {Button, Menu, MenuItem, Tooltip} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteAllTask, fillTasks} from "../Redux/actions";


const Header = ({token,selectedDate, user, setUser}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch()
    let history = useHistory();
    useEffect(getUser, [token])

    async function getUser() {
        const response = await axios.get('https://api-nodejs-todolist.herokuapp.com/user/me',
            {
                headers: {Authorization: 'Bearer ' + token}
            });

        console.log('getUser: ' + response.statusText);
        setUser(response.data)
    }

    function logout() {
        sessionStorage.setItem('token', '');
        history.push('/')
    }

    return (
        <div className={s.header}>
            <div className={s.logo}>
                <img src={logo} alt="icon"/>
                <div className={s.logo__name}>Calendar-app</div>
            </div>
            <div
                className={s.today}>{`Today: ${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`}</div>
            <div className={s.account}>
                <Tooltip title="Logout">
                    <button className={s.userData} onClick={logout}>{user?.email}</button>
                </Tooltip>

                <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className={s.account__settings}
                >
                    <img src={settings} alt="settings"/>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {
                        handleClose()
                        dispatch(deleteAllTask(token, selectedDate))
                    }}>delete all posts</MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default Header;