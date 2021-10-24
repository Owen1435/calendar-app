import React from 'react';
import classnames from 'classnames'
import s from './TodoItem.module.scss'

const TodoItem = ({item, currentList, deletePost}) => {

    function deleteItem() {
        currentList.items = currentList.items.filter(i => i !== item)
        deletePost(item.id)
    }

    function completeItem() {
        const compItem = currentList.items.find(i => i === item)
        compItem.completed = !compItem.completed;
    }

    return (
        <div className={s.todoItem}>
            <button className={s.completeBtn} onClick={completeItem}/>
            <div className={classnames(s.content, {[s.completed]: item.completed})}>
                {item.content}
            </div>
            <div className={s.delete}>
                <button onClick={deleteItem}>x</button>
            </div>
        </div>
    );
};

export default TodoItem;