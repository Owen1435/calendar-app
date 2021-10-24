import React, {useState} from 'react';
import TodoItem from "./TodoItem";
import s from './TodoLIst.module.scss'

const TodoList = ({addPost, deletePost, currentList, isDisabledBtn, setDisabledBtn}) => {
    const [title, setTitle] = useState('')

    function addItem() {
        const newItem = {
            date: Date.now(),
            content: title,
            completed: false
        }

        if (title !== '') {
            currentList.items = [...currentList.items, newItem]
        }

        setTitle('')
        setDisabledBtn(true)

        addPost(title)
    }

    return (
        <div className={s.todoList}>
            <div className={s.items}>
                {currentList?.items.map(item => <TodoItem item={item} currentList = {currentList} deletePost={deletePost}/>)}
            </div>

            <div className={s.input}>
                <input disabled={isDisabledBtn} type="text" value={title} onChange={e => setTitle(e.target.value)} onKeyUp={e => e.keyCode === 13 && addItem()} placeholder={'todo text (press Enter to save)'}/>
            </div>
        </div>
    );
};

export default TodoList;