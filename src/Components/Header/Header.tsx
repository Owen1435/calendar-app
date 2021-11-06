import React, {useState} from 'react';
import s from './Header.module.scss'
import logo from '../assets/img/calendar-icon.png'
import axios from "axios";
import {Tooltip} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteAllTask} from "../../Redux/Sagas/taskActions";
import {Button} from "@mui/material";
import {IUser} from "../../Pages/Login.page"

interface HeaderProps {
    token: string
    selectedDate: Date
}

const Header: React.FC<HeaderProps> = ({token, selectedDate}) => {
    let history = useHistory();
    const [user, setUser] = useState<IUser>()
    const dispatch = useDispatch()

    // useEffect(getUser, [token])
    getUser()

    async function getUser(): Promise<void> {
        const response = await axios.get<any>('https://api-nodejs-todolist.herokuapp.com/user/me',
            {
                headers: {Authorization: 'Bearer ' + token}
            });
        
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

                <Button onClick={() => dispatch(deleteAllTask(token, selectedDate))}>Del</Button>
            </div>
        </div>
    );
};

export default Header;