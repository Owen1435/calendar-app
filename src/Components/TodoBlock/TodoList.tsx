import React, {useState} from 'react';
import TodoItem from "./TodoItem";
import s from './TodoLIst.module.scss'
import {useDispatch} from "react-redux";
import {CircularProgress} from "@mui/material";
import EditWindow from "./EditWindow";
import {addTask, deleteTask} from "../../Redux/Sagas/taskActions";
import {useTypedSelector} from "../../Redux/Reducers/useTypedSelector";
import {ITask} from "../../Utils/taskHandler.util"

interface TodoListProps {
    token: string
    selectedDate: Date
    adding: boolean
    setAdding: React.Dispatch<boolean>
}

const TodoList: React.FC<TodoListProps> = ({token, selectedDate, adding, setAdding}) => {
    const [title, setTitle] = useState('')
    const [timeFrom, setTimeFrom] = useState('')
    const [timeTo, setTimeTo] = useState('')
    const [editing, setEditing] = useState(false)  //костыль
    const [_editItem, setEditItem] = useState<ITask | undefined>(undefined)  //костыль

    const tasks: ITask[] = useTypedSelector(state => state.tasks.items)
    const isLoaded: boolean = useTypedSelector(state => state.tasks.isLoaded)

    const dispatch = useDispatch()

    function resetInputs(): void {
        setTitle('')
        setTimeFrom('')
        setTimeTo('')
    }

    function addItem(): void {
        if (title !== '') {
            dispatch(addTask(token, selectedDate, title, timeFrom, timeTo))
        }

        resetInputs()
        setAdding(true)
    }

    function cancel(): void {
        resetInputs()
        setAdding(true)
        setEditing(false)
    }

    function edit(item: ITask): void {
        setEditing(true)
        setTitle(item.text)
        setTimeFrom(item.timeFrom)
        setTimeTo(item.timeTo)

        setEditItem(item)
    }

    function editItem(): void {
        dispatch(deleteTask(token, selectedDate, _editItem?.id))
        dispatch(addTask(token, selectedDate, title, timeFrom, timeTo))

        resetInputs()
        setEditing(false)
    } //костыль

    return (
        <div className={s.todoList}>
            {isLoaded
                ?
                <div className={s.items}>
                    {tasks?.map(item => <TodoItem key={item.id} item={item} token={token}
                                                  selectedDate={selectedDate} edit={edit}/>)}
                </div>
                :
                <div className={s.progressBlock}>
                    <CircularProgress className={s.progress}/>
                </div>
            }

            {!adding
                ?
                <EditWindow title={title} setTitle={setTitle} timeFrom={timeFrom} setTimeFrom={setTimeFrom}
                            timeTo={timeTo} setTimeTo={setTimeTo} cancel={cancel} name={'add'} funcItem={addItem}/>
                :
                editing
                    ?
                    <EditWindow title={title} setTitle={setTitle} timeFrom={timeFrom} setTimeFrom={setTimeFrom}
                                timeTo={timeTo} setTimeTo={setTimeTo} cancel={cancel} name={'edit'}
                                funcItem={editItem}/>
                    :
                    <></>
            }
        </div>
    );
};

export default TodoList;