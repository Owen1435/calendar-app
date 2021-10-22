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
let weekday = [
    {name: 'mo', fullName: 'Monday', className: ''},
    {name: 'tu', fullName: 'Tuesday', className: ''},
    {name: 'we', fullName: 'Wednesday', className: ''},
    {name: 'th', fullName: 'Thursday', className: ''},
    {name: 'fr', fullName: 'Friday', className: ''},
    {name: 'sa', fullName: 'Saturday', className: 'weekend'},
    {name: 'su', fullName: 'Sunday', className: 'weekend'}]

function getDateRange(year) {
    let range = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (year % 5 === 0) {
        range[1] = 29
    }

    return range
}

function getDaysArr(selectedDate) {
    let days = []
    let dateRange = getDateRange(selectedDate.getFullYear())
    let firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()

    let lastDateOfPrevMonth = getDateRange(selectedDate.getFullYear())[(selectedDate.getMonth() - 1) < 0 ? 11 : (selectedDate.getMonth() - 1)]
    for (let i = firstDay - 2; i >= 0; i--) {
        days.push({
            content: new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, lastDateOfPrevMonth - i),
            disabled: true
        })
    }

    for (let day = 1; day <= dateRange[selectedDate.getMonth()]; day++) {
        days.push({content: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)})
    }

    return days
}

function getDayName(selectedDate) {
    if (selectedDate.getDay() === 0) {
        return weekday[6].fullName.toUpperCase()
    }
    return weekday[selectedDate.getDay() - 1].fullName.toUpperCase()
}

function getMonthName(selectedDate) {
    return month[selectedDate.getMonth()].fullName
}

function getNextMonth(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
}

function getPrevMonth(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
}

function compareDate(date1, date2) {
    if (!date1 || !date2) {
        return false
    }

    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate())
}

export {month, weekday, getDaysArr, getDayName, getMonthName, compareDate, getNextMonth, getPrevMonth}