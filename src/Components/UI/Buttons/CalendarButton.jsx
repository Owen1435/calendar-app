import React from 'react';
import s from './CalendarButton.module.css'

const CalendarButton = ({children, ...props}) => {
    return (
        <button className={s.calendar__button} {...props}>
            {children}
        </button>
    );
};

export default CalendarButton;