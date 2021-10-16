import React from 'react';

const WeekdayCell = ({day}) => {
    return (
        <div className={'calendar__weekday-cell ' + day?.className}>{day.name}</div>
    );
};

export default WeekdayCell;