import React, {useState} from 'react';
import CalendarCell from "./CalendarCell";
import WeekdayCell from "./WeekdayCell";
import CalendarButton from "./UI/Buttons/CalendarButton";
import TodoList from "./TodoList";

import s from './Calendar.module.scss'
import {weekday, getDaysArr, getDayName, getMonthName, getPrevMonth, getNextMonth} from './DateFunctions'
import Header from "./Header";

const Calendar = () => {
    let curDate = new Date()
    let [selectedDate, setSelectedDate] = useState(curDate)
    let days = getDaysArr(selectedDate)

    function getOrCreateTodoList() {
        const list = todoList.find(list => list.id.getFullYear() === selectedDate.getFullYear() &&
            list.id.getMonth() === selectedDate.getMonth() &&
            list.id.getDate() === selectedDate.getDate())
        if (list) {
            return list
        }

        const newList = {
            id: selectedDate,
            items: []
        }

        setTodoList([...todoList, newList])

        return newList
    }

    function selectDate(date) {
        setSelectedDate(date)
        currentList = getOrCreateTodoList()
        setItems(currentList.items)
    }

    const [todoList, setTodoList] = useState([])
    let currentList = getOrCreateTodoList()
    const [items, setItems] = useState(currentList.items)

    return (
        <>
            <Header/>

            <div className={s.main}>
                <div className={s.calendar}>

                    <div className={s.calendar__year}>{selectedDate.getFullYear()}</div>

                    <div className={s.calendar__title}>
                        <CalendarButton onClick={() => setSelectedDate(getPrevMonth(selectedDate))}>{'<'}</CalendarButton>
                        <div className={s.calendar__month}>{getMonthName(selectedDate)}</div>
                        <CalendarButton onClick={() => setSelectedDate(getNextMonth(selectedDate))}>{'>'}</CalendarButton>
                    </div>

                    <div className={s.calendar__daysName}>
                        {weekday.map(weekday => <WeekdayCell day={weekday}/>)}
                    </div>

                    <div className={s.calendar__days}>
                        {days.map(date => <CalendarCell date={date} selectDate={selectDate} selectedDate = {selectedDate}/>)}
                    </div>
                </div>

                <div className={s.todoBlock}>
                    <div className={s.todoBlock__add}>
                        <button>+</button>
                    </div>
                    <div className={s.selectedDate}>
                        <div className={s.selectedDate__day}>{selectedDate.getDate()}</div>
                        <div className={s.selectedDate__weekDay}>{getDayName(selectedDate)}</div>
                    </div>

                    <TodoList currentList={currentList} setItems={setItems}/>
                </div>
            </div>
        </>
    );
};

export default Calendar;