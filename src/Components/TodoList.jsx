import React, {useState} from 'react';
import TodoItem from "./TodoItem";
import s from './TodoLIst.module.scss'

const TodoList = ({addPost, deletePost, tasks, completePost, isDisabledBtn, setDisabledBtn}) => {
    const [title, setTitle] = useState('')

    function addItem() {
        if (title !== '') {
            addPost(title)
        }

        setTitle('')
        setDisabledBtn(true)
    }

    return (
        <div className={s.todoList}>
            <div className={s.items}>
                {tasks?.map(item => <TodoItem key={item.id} item={item} deletePost={deletePost} completePost={completePost}/>)}
            </div>

            <div className={s.input}>
                <input disabled={isDisabledBtn} type="text" value={title} onChange={e => setTitle(e.target.value)} onKeyUp={e => e.keyCode === 13 && addItem()} placeholder={'todo text (press Enter to save)'}/>
            </div>
        </div>
    );
};

export default TodoList;