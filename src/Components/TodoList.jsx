import React, {useState} from 'react';
import TodoItem from "./TodoItem";
import s from './TodoLIst.module.scss'

const TodoList = ({currentList, setItems}) => {
    const [title, setTitle] = useState('')

    function addItem() {
        const newItem = {
            id: Date.now(),
            content: title,
            completed: false
        }

        if (title !== '') {
            currentList.items = [...currentList.items, newItem]
            setItems(currentList.items)
        }

        setTitle('')
    }

    return (
        <div className={s.todoList}>
            <div className={s.items}>
                {currentList.items.map(item => <TodoItem item={item}/>)}
            </div>

            <div className={s.input}>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                <button onClick={addItem}>+</button>
            </div>
        </div>
    );
};

export default TodoList;