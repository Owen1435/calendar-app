export interface IDay {
    date: Date
    disabled: boolean
}

export interface IWeekDay {
    name: string
    fullName: string
    className: string
}

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
let weekday: Array<IWeekDay> = [
    {name: 'mo', fullName: 'Monday', className: ''},
    {name: 'tu', fullName: 'Tuesday', className: ''},
    {name: 'we', fullName: 'Wednesday', className: ''},
    {name: 'th', fullName: 'Thursday', className: ''},
    {name: 'fr', fullName: 'Friday', className: ''},
    {name: 'sa', fullName: 'Saturday', className: 'weekend'},
    {name: 'su', fullName: 'Sunday', className: 'weekend'}]

function getDateRange(year: number): number[] {
    let range = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (year % 5 === 0) {
        range[1] = 29
    }

    return range
}

function getDaysArr(selectedDate: Date): IDay[] {
    let days: IDay[] = []
    let dateRange: number[] = getDateRange(selectedDate.getFullYear())
    let firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()

    let lastDateOfPrevMonth = getDateRange(selectedDate.getFullYear())[(selectedDate.getMonth() - 1) < 0 ? 11 : (selectedDate.getMonth() - 1)]
    for (let i = firstDay - 2; i >= 0; i--) {
        days.push({
            date: new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, lastDateOfPrevMonth - i),
            disabled: true
        })
    }

    for (let day = 1; day <= dateRange[selectedDate.getMonth()]; day++) {
        days.push({
            date: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day),
            disabled: false
        })
    }

    return days
}

function getDayName(selectedDate: Date): string{
    if (selectedDate.getDay() === 0) {
        return weekday[6].fullName.toUpperCase()
    }
    return weekday[selectedDate.getDay() - 1].fullName.toUpperCase()
}

function getMonthName(selectedDate: Date): string {
    return month[selectedDate.getMonth()].fullName
}

function getNextMonth(currentDate: Date): Date {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
}

function getPrevMonth(currentDate: Date): Date {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
}

function compareDate(date1: Date, date2: Date): boolean {
    if (!date1 || !date2) {
        return false
    }

    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate())
}

export {weekday, getDaysArr, getDayName, getMonthName, compareDate, getNextMonth, getPrevMonth}