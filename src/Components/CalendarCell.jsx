import React from 'react';
import {compareDate} from './DateFunctions'
import classnames from "classnames";
import s from './CalendarCell.module.scss'

const CalendarCell = ({day, selectDate, selectedDate}) => {
    return (
        <button className={classnames(s.calendar__cell, {
            [s.selected]: compareDate(day.date, selectedDate),
            [s.disabled]: day.disabled,
            [s.current]: compareDate(day.date, new Date())
        })}
                onClick={() => selectDate(day.date)}>{day.date?.getDate()}</button>
    );
};

export default CalendarCell;