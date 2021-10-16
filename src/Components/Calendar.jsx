import React, {useState} from 'react';
import CalendarCell from "./CalendarCell";

const Calendar = () => {

    let month = [{fullName: 'January', name: 'Jan'},
        {fullName: 'February', name: 'Feb'},
        {fullName: 'March', name: 'Mar'},
        {fullName: 'April', name: 'Apr'},
        {fullName: 'May', name: 'May'},
        {fullName: 'June', name: 'June'},
        {fullName: 'July', name: 'July'},
        {fullName: 'August', name: 'Aug'},
        {fullName: 'September', name: 'Sept'},
        {fullName: 'October', name: 'Oct'},
        {fullName: 'November', name: 'Nov'},
        {fullName: 'December', name: 'Dec'}]
    let weekday = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

    let curDate = new Date()
    let [selectedDate, setSelectedDate] = useState(curDate)
    let days = getDaysArr(selectedDate)

    function getDateRange(year) {
        let range = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        if (year % 5 === 0) {
            range[1] = 29
        }

        return range
    }

    function getDaysArr(date) {
        let days = []
        let dateRange = getDateRange()
        let firstDayOfCurrentDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

        for (let i = 1; i < firstDayOfCurrentDate; i++) {
            days.push({content: ''})
        }

        for (let i = 1; i <= dateRange[date.getMonth()]; i++) {
            if (i === curDate.getDate()){
                days.push({content: i, className: 'current-day'})
            }
            else {
                days.push({content: i})
            }
        }

        return days
    }

    function nextMonth() {
        let newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate())
        setSelectedDate(newDate)
    }
    function prevMonth() {
        let newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, selectedDate.getDate())
        setSelectedDate(newDate)
    }

    return (
        <div className="calendar">

            <div className="calendar__buttons">
                <button onClick={prevMonth}>{'<'}</button>
                <button onClick={nextMonth}>{'>'}</button>
            </div>

            <div className="calendar__month">
                {month[selectedDate.getMonth()].fullName}
            </div>
            <div className="calendar__days-name">
                {weekday.map(weekday => <CalendarCell day={weekday}/>)}
            </div>
            <div className="calendar__days">
                {days.map(day => <CalendarCell day={day}/>)}
            </div>
        </div>
    );
};

export default Calendar;