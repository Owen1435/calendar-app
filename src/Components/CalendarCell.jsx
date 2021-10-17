import React from 'react';

const CalendarCell = ({date, selectDate}) => {
    return (
        <button className={'calendar__cell ' + date?.className} onClick={() => selectDate(date.content)}>{date.content?.getDate()}</button>
    );
};

export default CalendarCell;