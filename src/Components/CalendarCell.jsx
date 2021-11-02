import React from 'react';
import {compareDate} from '../Utils/DateFunctions.util.js'
import classnames from "classnames";
import s from './CalendarCell.module.scss'
import {useSelector} from "react-redux";

const CalendarCell = ({day, setSelectedDate, selectedDate}) => {
    const dateWithTasks = useSelector(state => state.tasks.dateWithTasks)

    function isHaveTasks() {
        let isContains = false
        dateWithTasks.forEach(date => {
            if (compareDate(date, day.date)){
                isContains = true
            }
        })

        return isContains
    }

    return (
        <button className={classnames(s.calendar__cell, {
            [s.selected]: compareDate(day.date, selectedDate),
            [s.disabled]: day.disabled,
            [s.current]: compareDate(day.date, new Date()),
            [s.haveTasks]: isHaveTasks()
        })}
                onClick={() => setSelectedDate(day.date)}>{day.date?.getDate()}</button>
    );
};

export default CalendarCell;