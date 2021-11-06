import {ITask} from "../../Utils/taskHandler.util";
import {ADD_TASKS, MAKE_LOADED, MAKE_UNLOADED, SET_DATES_WITH_TASKS} from "../types";

export interface UserState {
    items: ITask[]
    dateWithTasks: Date[]
    isLoaded: boolean
}

export interface AddTasksAction {
    type: typeof ADD_TASKS
    payload: ITask[]
}

export interface SetDatesWithTasksAction {
    type: typeof SET_DATES_WITH_TASKS
    payload: Date[]
}

export interface MakeLoadedAction {
    type: typeof MAKE_LOADED
}

export interface MakeUnloadedAction {
    type: typeof MAKE_UNLOADED
}

export type UserAction = AddTasksAction | SetDatesWithTasksAction | MakeLoadedAction | MakeUnloadedAction