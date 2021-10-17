import React from 'react';
import s from './TodoItem.module.css'

const TodoItem = ({item}) => {
    return (
        <div className={s.todoItem}>
            <div>
                <input type="checkbox"/>
            </div>
            <div>{item.content}</div>
        </div>
    );
};

export default TodoItem;