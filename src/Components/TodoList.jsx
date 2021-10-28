import React, {useState} from 'react';
import TodoItem from "./TodoItem";
import s from './TodoLIst.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addTask, deleteTask} from "../Redux/actions";
import {CircularProgress} from "@mui/material";
import EditWindow from "./editWindow";

const TodoList = ({token, selectedDate, adding, setAdding}) => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks.items)
    const isLoaded = useSelector(state => state.tasks.isLoaded)

    const [title, setTitle] = useState('')
    const [timeFrom, setTimeFrom] = useState('')
    const [timeTo, setTimeTo] = useState('')

    function addItem() {
        if (title !== '') {
            dispatch(addTask(token, selectedDate, title, timeFrom, timeTo))
        }

        setTitle('')
        setTimeFrom('')
        setTimeTo('')
        setAdding(true)
    }

    function cancel() {
        setTitle('')
        setTimeFrom('')
        setTimeTo('')
        setAdding(true)
        setEditing(false)
    }

    const [editing, setEditing] = useState(false)  //костыль
    const [_editItem, setEditItem] = useState({})  //костыль

    function edit(item) {
        setEditing(true)
        setTitle(item.text)
        setTimeFrom(item.timeFrom)
        setTimeTo(item.timeTo)

        setEditItem(item)
    }

    function editItem() {
        dispatch(deleteTask(token, selectedDate, _editItem.id))
        dispatch(addTask(token, selectedDate, title, timeFrom, timeTo))

        setTitle('')
        setTimeFrom('')
        setTimeTo('')
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
                            timeTo={timeTo} setTimeTo={setTimeTo} cancel={cancel} name = {'add'} funcItem={addItem}/>
                :
                editing
                    ?
                    <EditWindow title={title} setTitle={setTitle} timeFrom={timeFrom} setTimeFrom={setTimeFrom}
                                timeTo={timeTo} setTimeTo={setTimeTo} cancel={cancel} name = {'edit'} funcItem={editItem}/>
                    :
                    <></>
            }
        </div>
    );
};

export default TodoList;