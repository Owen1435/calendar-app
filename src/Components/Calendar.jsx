import React, {useEffect, useState} from 'react';
import CalendarCell from "./CalendarCell";
import WeekdayCell from "./WeekdayCell";
import CalendarButton from "./UI/Buttons/CalendarButton";
import TodoList from "./TodoList";

import s from './Calendar.module.scss'
import {weekday, getDaysArr, getDayName, getMonthName, getPrevMonth, getNextMonth, compareDate} from './DateFunctions'
import Header from "./Header";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addTask, completeTask, deleteAllTask, deleteTask, fillTasks} from "../Redux/actions";

const Calendar = ({token}) => {
    const curDate = new Date()
    let [selectedDate, setSelectedDate] = useState(curDate)
    let days = getDaysArr(selectedDate)
    const [user, setUser] = useState()
    const [isDisabledBtn, setDisabledBtn] = useState(true)   //для стилей

    const [tasks, setTasks] = useState([])

    useEffect(() => getPosts(selectedDate), [selectedDate])

    function selectDate(date) {
        setSelectedDate(date)
        setTasks([])
    }

    async function addPost(text) {
        const response = await axios.post('https://api-nodejs-todolist.herokuapp.com/task',
            {
                "description": JSON.stringify({'date': selectedDate.getTime(), 'text': text})
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

        console.log('addPost: ' + response.statusText);
        getPosts(selectedDate)
    }

    async function getPosts(selectDate) {
        const response = await axios.get('https://api-nodejs-todolist.herokuapp.com/task',
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
        console.log('getPosts: ' + response.statusText);

        const tasks = []
        response.data.data.forEach((item) => {
            const object = JSON.parse(item.description)

            const date = new Date(object.date)
            const text = object.text

            if (compareDate(date, selectDate)) {
                tasks.push({id: item._id, text: text, completed: item.completed})
            }
        })
        setTasks(tasks)
    }

    async function deletePost(id) {
        const response = await axios.delete('https://api-nodejs-todolist.herokuapp.com/task/' + id,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
        console.log('deletePost: ' + response.statusText);

        await getPosts(selectedDate)
    }

    async function completePost(item) {
        const response = await axios.put('https://api-nodejs-todolist.herokuapp.com/task/' + item.id,
            {
                "completed": !item.completed
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
        console.log('completePost: ' + response.statusText);
        getPosts(selectedDate)
    }

    async function deleteAllPosts() {
        const response = await axios.get('https://api-nodejs-todolist.herokuapp.com/task',
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

        response.data.data.forEach((item) => {
            console.log('Remove: ' + item._id)
            deletePost(item._id)
        })
    }

    const dispatch = useDispatch()
    const reduxTasks = useSelector(state => state.tasks)

    function reduxFillTasks() {
        dispatch(fillTasks(token, selectedDate))
    }

    function reduxAddTask() {
        dispatch(addTask(token, selectedDate, '123456789'))
    }

    function reduxCompleteTask() {
        dispatch(completeTask(token, selectedDate, reduxTasks[0]))
    }

    function reduxDeleteTask() {
        dispatch(deleteTask(token, selectedDate, reduxTasks[0].id))
    }

    function reduxDeleteAllTask() {
        dispatch(deleteAllTask(token, selectedDate))
    }

    return (
        <>
            <button onClick={reduxFillTasks}>reduxFillTasks</button>
            <button onClick={reduxAddTask}>reduxAddTask</button>
            <button onClick={reduxDeleteTask}>reduxDeleteTask</button>
            <button onClick={reduxCompleteTask}>reduxCompleteTask</button>
            <button onClick={reduxDeleteAllTask}>reduxDeleteAllTask</button>

            <Header curDate={curDate} token={token} user={user} setUser={setUser} getPosts={getPosts} deleteAllPosts={deleteAllPosts}/>

            <div className={s.main}>
                <div className={s.calendar}>

                    <div className={s.calendar__year}>{selectedDate.getFullYear()}</div>

                    <div className={s.calendar__title}>
                        <CalendarButton
                            onClick={() => setSelectedDate(getPrevMonth(selectedDate))}>{'<'}</CalendarButton>
                        <div className={s.calendar__month}>{getMonthName(selectedDate)}</div>
                        <CalendarButton
                            onClick={() => setSelectedDate(getNextMonth(selectedDate))}>{'>'}</CalendarButton>
                    </div>

                    <div className={s.calendar__daysName}>
                        {weekday.map(weekday => <WeekdayCell key={weekday.fullName} day={weekday}/>)}
                    </div>

                    <div className={s.calendar__days}>
                        {days.map(day => <CalendarCell key={day.date} day={day} selectDate={selectDate}
                                                        selectedDate={selectedDate}/>)}
                    </div>
                </div>

                <div className={s.todoBlock}>
                    <div className={s.todoBlock__add}>
                        <button onClick={() => setDisabledBtn(!isDisabledBtn)}>+</button>
                    </div>
                    <div className={s.selectedDate}>
                        <div className={s.selectedDate__day}>{selectedDate.getDate()}</div>
                        <div className={s.selectedDate__weekDay}>{getDayName(selectedDate)}</div>
                    </div>

                    <TodoList addPost={addPost}
                              deletePost={deletePost}
                              tasks={tasks}
                              completePost={completePost}
                              isDisabledBtn={isDisabledBtn}
                              setDisabledBtn={setDisabledBtn}/>
                </div>
            </div>
        </>
    );
};

export default Calendar;