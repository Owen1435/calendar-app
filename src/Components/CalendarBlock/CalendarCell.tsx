import React from 'react';
import {compareDate, IDay} from '../../Utils/DateFunctions.util'
import classnames from "classnames";
import s from './CalendarCell.module.scss'
import {useTypedSelector} from "../../Redux/Reducers/useTypedSelector";

interface CalendarCellProps {
    day: IDay
    selectedDate: Date
    setSelectedDate: React.Dispatch<Date>
}

const CalendarCell: React.FC<CalendarCellProps> = ({day, selectedDate, setSelectedDate}) => {
    const dateWithTasks: Date[] = useTypedSelector(state => state.tasks.dateWithTasks)

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