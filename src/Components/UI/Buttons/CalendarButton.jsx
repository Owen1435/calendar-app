import React from 'react';

const CalendarButton = ({children, ...props}) => {
    return (
        <button className='calendar__button' {...props}>
            {children}
        </button>
    );
};

export default CalendarButton;