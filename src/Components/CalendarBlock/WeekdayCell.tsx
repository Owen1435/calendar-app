import React from 'react';
import {IWeekDay} from "../../Utils/DateFunctions.util";

interface WeekdayCellProps {
    day: IWeekDay
}

const WeekdayCell: React.FC<WeekdayCellProps> = ({day}) => {
    return (
        <div className={'calendar__weekday-cell ' + day?.className}>{day.name}</div>
    );
};

export default WeekdayCell;