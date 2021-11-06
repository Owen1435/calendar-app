import React, {FC, useEffect, useState} from 'react';
import Header from "../Components/Header/Header";
import {useDispatch} from "react-redux";
import {fillTasks} from "../Redux/Sagas/taskActions";
import s from "../Components/CalendarBlock/Calendar.module.scss";
import Calendar from "../Components/CalendarBlock/Calendar";
import {MAKE_UNLOADED} from "../Redux/types";
import TodoBlock from "../Components/TodoBlock/TodoBlock";

interface MainPageProps {
    token: string
}

const MainPage: FC<MainPageProps> = ({token}) => {
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
        dispatch({type: MAKE_UNLOADED})
        dispatch(fillTasks(token, selectedDate))
    }, [selectedDate])

    return (
        <>
            <Header token={token} selectedDate={selectedDate}/>

            <div className={s.main}>
                <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                <TodoBlock token={token} selectedDate={selectedDate}/>
            </div>
        </>
    );
};

export default MainPage;