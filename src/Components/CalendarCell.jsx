import React from 'react';
import {compareDate} from './DateFunctions'
import classnames from "classnames";
import s from './CalendarCell.module.scss'

const CalendarCell = ({date, selectDate, selectedDate}) => {
    return (
        <button className={classnames(s.calendar__cell, {[s.selected]:compareDate(date.content,selectedDate), [s.disabled]: date.disabled})}
                onClick={() => selectDate(date.content)}>{date.content?.getDate()}</button>
    );
};

export default CalendarCell;