import React, {useState} from 'react';
import CalendarCell from "./CalendarCell";
import WeekdayCell from "./WeekdayCell";
import CalendarButton from "./UI/Buttons/CalendarButton";
import TodoList from "./TodoList";

import s from './Calendar.module.scss'
import {weekday, getDaysArr, getDayName, getMonthName, getPrevMonth, getNextMonth, compareDate} from './DateFunctions'
import Header from "./Header";
import axios from "axios";

const Calendar = ({token}) => {
    let curDate = new Date()
    let [selectedDate, setSelectedDate] = useState(curDate)
    let days = getDaysArr(selectedDate)

    const [user, setUser] = useState()
    const [todoList, setTodoList] = useState([])
    let currentList = getOrCreateTodoList(selectedDate)

    const [isDisabledBtn, setDisabledBtn] = useState(true)   //для стилей

    function getOrCreateTodoList(date) {
        const list = todoList.find(list => compareDate(list.date, date))
        if (list){
            return list
        }
        const newList = {date: date, items: []}
        setTodoList([...todoList, newList])
        return newList

        //setTodoList([...todoList, newList])
        //todoList.push(newList)
    }

    function selectDate(date) {
        setSelectedDate(date)
        currentList = getOrCreateTodoList(date)
    }

    async function addPost(post) {
        const date = `${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`

        const response = await axios.post('https://api-nodejs-todolist.herokuapp.com/task',
            {
                "description": JSON.stringify({'date': date, 'text': post})
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

        console.log(response.status);
    }

    async function getPosts() {
        const response = await axios.get('https://api-nodejs-todolist.herokuapp.com/task',
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

        console.log(response.status);

        response.data.data.forEach((item) => {
            const object = JSON.parse(item.description)

            const arr = object.date.split('.')
            const date = new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]))
            const text = object.text

            console.log(date + ' ' + text);

            const list = getOrCreateTodoList(date)
            list.items = [...list.items, {id: item._id, date: date, content: text, completed: object.completed}]
        })
    }

    async function deletePost(id) {
        const response = await axios.delete('https://api-nodejs-todolist.herokuapp.com/task/' + id,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

        console.log(response.status);
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
            deletePost(item._id)
        })
    }

    return (
        <>
            <div>
                {/*<button onClick={addPost}>addPost</button>*/}
                <button onClick={getPosts}>getPosts</button>
                <button onClick={deletePost('')}>deletePost</button>
                <button onClick={deleteAllPosts}>deleteAllPosts</button>
            </div>

            <Header curDate={curDate} token={token} user={user} setUser={setUser}/>

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
                        {weekday.map(weekday => <WeekdayCell key={weekday} day={weekday}/>)}
                    </div>

                    <div className={s.calendar__days}>
                        {days.map(date => <CalendarCell key={date} date={date} selectDate={selectDate}
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
                              deletePost = {deletePost}
                              currentList={currentList}
                              isDisabledBtn={isDisabledBtn}
                              setDisabledBtn={setDisabledBtn}/>
                </div>
            </div>
        </>
    );
};

export default Calendar;