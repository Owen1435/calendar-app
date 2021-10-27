import React from 'react';
import classnames from 'classnames'
import s from './TodoItem.module.scss'
import accept from './assets/img/accept.png'
import {completeTask, deleteTask} from "../Redux/actions";
import {useDispatch} from "react-redux";

const TodoItem = ({token, selectedDate, item}) => {
    const dispatch = useDispatch()

    function deleteItem() {
        dispatch(deleteTask(token, selectedDate, item.id))
    }

    function completePost() {
        dispatch(completeTask(token, selectedDate, item))
    }

    return (
        <div className={classnames(s.todoItem, {[s.completed]: item.completed})}>
            <button className={s.completeBtn} onClick={completePost}>
                <img src={accept} alt="."/>
            </button>
            <div className={s.content}>{item.text}</div>
            <div className={s.delete}>
                <button onClick={deleteItem}>x</button>
            </div>
        </div>
    );
};

export default TodoItem;