import React, {useState} from 'react';
import CalendarCell from "./CalendarCell";
import WeekdayCell from "./WeekdayCell";
import CalendarButton from "./UI/Buttons/CalendarButton";
import TodoList from "./TodoList";
import s from './Calendar.module.css'
import {weekday, getDaysArr, getDayName, getMonthName} from './DateFunctions'

const Calendar = () => {
    let curDate = new Date()
    let [selectedDate, setSelectedDate] = useState(curDate)
    let days = getDaysArr(selectedDate, curDate)

    function nextMonth() {
        let newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
        setSelectedDate(newDate)
    }
    function prevMonth() {
        let newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
        setSelectedDate(newDate)
    }

    const [todoList, setTodoList] = useState([])
    let currentList = getOrCreateTodoList()

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

    const [items, setItems] = useState(currentList.items)

    function selectDate(date) {
        // let updateDays = days.map(day => {
        //     if (day.content === date) {
        //         return {...day, selected: true, className: day.className += ' selected'}
        //     } else {
        //         return {...day, selected: false}
        //     }
        // })

        setSelectedDate(date)
        currentList = getOrCreateTodoList()
        setItems(currentList.items)
    }

    return (
        <div className={s.main}>
            <div className={s.calendar}>
                <div className={s.calendar__title}>
                    <CalendarButton onClick={prevMonth}>{'<<'}</CalendarButton>
                    <div className={s.calendar__month}>
                        {getMonthName(selectedDate)}
                    </div>
                    <CalendarButton onClick={nextMonth}>{'>>'}</CalendarButton>
                </div>

                <div className={s.calendar__daysName}>
                    {weekday.map(weekday => <WeekdayCell day={weekday}/>)}
                </div>

                <div className={s.calendar__days}>
                    {days.map(date => <CalendarCell date={date} selectDate={selectDate}/>)}
                </div>
            </div>

            <div className={s.todoBlock}>
                <div className={s.selectedDate}>
                    <div className={s.selectedDate__day}>{selectedDate.getDate()}</div>
                    <div className={s.selectedDate__weekDay}>{getDayName(selectedDate)}</div>
                </div>

                <TodoList currentList={currentList} items={items} setItems={setItems}/>
            </div>
        </div>
    );
};

export default Calendar;