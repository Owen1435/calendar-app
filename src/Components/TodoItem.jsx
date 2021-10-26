import React from 'react';
import classnames from 'classnames'
import s from './TodoItem.module.scss'
import accept from './assets/img/accept.png'

const TodoItem = ({item, deletePost, completePost}) => {

    function deleteItem() {
        deletePost(item.id)
    }

    return (
        <div className={classnames(s.todoItem, {[s.completed]: item.completed})}>
            <button className={s.completeBtn} onClick={() => completePost(item)}>
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