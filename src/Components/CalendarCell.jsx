import React from 'react';

const CalendarCell = ({day}) => {
    return (
        <div className={'calendar__cell ' + day?.className}>{day.content}</div>
    );
};

export default CalendarCell;