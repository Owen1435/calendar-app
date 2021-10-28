import React, {useState} from 'react';
import s from "./TodoBlock.module.scss";
import {getDayName} from "../DateFunctions.util.js";
import TodoList from "./TodoList";

const TodoBlock = ({token, selectedDate}) => {
    const [adding, setAdding] = useState(true)

    return (
        <div className={s.todoBlock}>
            <div className={s.todoBlock__add}>
                <button onClick={() => setAdding(!adding)}>+</button>
            </div>
            <div className={s.selectedDate}>
                <div className={s.selectedDate__day}>{selectedDate.getDate()}</div>
                <div className={s.selectedDate__weekDay}>{getDayName(selectedDate)}</div>
            </div>

            <TodoList token={token}
                      selectedDate={selectedDate}
                      adding={adding}
                      setAdding={setAdding}/>
        </div>
    );
};

export default TodoBlock;