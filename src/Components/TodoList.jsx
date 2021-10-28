import React, {useState} from 'react';
import TodoItem from "./TodoItem";
import s from './TodoLIst.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../Redux/actions";
import {CircularProgress} from "@mui/material";

const TodoList = ({token, selectedDate, isDisabledBtn, setDisabledBtn}) => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks.items)
    const isLoaded = useSelector(state => state.tasks.isLoaded)

    const [title, setTitle] = useState('')

    function addItem() {
        if (title !== '') {
            dispatch(addTask(token, selectedDate, title))
        }

        setTitle('')
        setDisabledBtn(true)
    }

    return (
        <div className={s.todoList}>
            {isLoaded
                ?
                <div className={s.items}>
                    {tasks?.map(item => <TodoItem key={item.id} item={item} token={token}
                                                  selectedDate={selectedDate}/>)}
                </div>
                :
                <div className={s.progressBlock}>
                    <CircularProgress className={s.progress}/>
                </div>
            }

            <div className={s.input}>
                <input disabled={isDisabledBtn} type="text" value={title} onChange={e => setTitle(e.target.value)}
                       onKeyUp={e => e.keyCode === 13 && addItem()} placeholder={'todo text (press Enter to save)'}/>
            </div>
        </div>
    );
};

export default TodoList;