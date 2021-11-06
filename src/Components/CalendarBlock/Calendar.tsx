import React from 'react';
import CalendarCell from "./CalendarCell";
import WeekdayCell from "./WeekdayCell";
import s from './Calendar.module.scss'
import {weekday, getMonthName, getPrevMonth, getNextMonth, getDaysArr} from '../../Utils/DateFunctions.util'

interface CalendarProps {
    selectedDate: Date
    setSelectedDate: React.Dispatch<Date>
}

const Calendar: React.FC<CalendarProps> = ({selectedDate, setSelectedDate}) => {
    let days = getDaysArr(selectedDate)

    return (
        <div className={s.calendar}>

            <div className={s.calendar__year}>{selectedDate.getFullYear()}</div>

            <div className={s.calendar__title}>
                <button className={s.calendar__button} onClick={() => setSelectedDate(getPrevMonth(selectedDate))}>{'<'}</button>
                <div className={s.calendar__month}>{getMonthName(selectedDate)}</div>
                <button className={s.calendar__button} onClick={() => setSelectedDate(getNextMonth(selectedDate))}>{'>'}</button>
            </div>

            <div className={s.calendar__daysName}>
                {weekday.map(weekday => <WeekdayCell key={weekday.fullName} day={weekday}/>)}
            </div>

            <div className={s.calendar__days}>
                {days.map(day => <CalendarCell key={day.date.getTime()} day={day} setSelectedDate={setSelectedDate}
                                               selectedDate={selectedDate}/>)}
            </div>
        </div>
    );
};

export default Calendar;