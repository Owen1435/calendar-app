import {compareDate} from "./DateFunctions.util";

export interface ITask {
    id: string
    text: string
    timeFrom: string
    timeTo: string
    completed: boolean
}

export function handleTasks(allTasks: any[], date: Date) {
    const dateWithTasks: Date[] = []
    const tasks: ITask[] = []

    allTasks.forEach((item) => {
        const object = JSON.parse(item.description)

        const taskDate = new Date(object.date)
        const text = object.text
        const timeFrom = object.timeFrom
        const timeTo = object.timeTo

        if (compareDate(taskDate, date)) {
            tasks.push({id: item._id, text: text, timeFrom: timeFrom, timeTo: timeTo, completed: item.completed})
        }

        dateWithTasks.push(taskDate)
    })

    return {tasks, dateWithTasks}
}