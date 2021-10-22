import React, {useState} from 'react';
import TodoItem from "./TodoItem";
import s from './TodoLIst.module.scss'

const TodoList = ({currentList, setItems, isDisabledBtn, setDisabledBtn}) => {
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
        setDisabledBtn(true)
    }

    return (
        <div className={s.todoList}>
            <div className={s.items}>
                {currentList.items.map(item => <TodoItem item={item} currentList = {currentList} setItems = {setItems}/>)}
            </div>

            <div className={s.input}>
                <input disabled={isDisabledBtn} type="text" value={title} onChange={e => setTitle(e.target.value)} onKeyUp={e => e.keyCode === 13 && addItem()} placeholder={'todo text (press Enter to save)'}/>
                {/*<button onClick={addItem}>+</button>*/}
            </div>
        </div>
    );
};

export default TodoList;