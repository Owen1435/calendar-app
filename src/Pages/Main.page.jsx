import React, {useEffect, useState} from 'react';
import Header from "../Components/Header";
import {useDispatch} from "react-redux";
//import {fillTasks} from "../Redux/actions";
import {fillTasks} from "../Redux/Sagas/taskSaga";
import s from "../Components/Calendar.module.scss";
import Calendar from "../Components/Calendar";
import {MAKE_UNLOADED} from "../Redux/types";
import TodoBlock from "../Components/TodoBlock";

const MainPage = ({token}) => {
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [user, setUser] = useState()

    useEffect(() => {
        dispatch(fillTasks(token, selectedDate))
        dispatch({type: MAKE_UNLOADED})
    }, [selectedDate])

    return (
        <>
            <Header token={token} user={user} setUser={setUser} selectedDate={selectedDate}/>

            <div className={s.main}>
                <Calendar token={token} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                <TodoBlock token={token} selectedDate={selectedDate}/>
            </div>
        </>
    );
};

export default MainPage;