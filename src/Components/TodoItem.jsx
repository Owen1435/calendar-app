import React from 'react';
import classnames from 'classnames'
import s from './TodoItem.module.scss'
import {completeTask, deleteTask} from "../Redux/actions";
import {useDispatch} from "react-redux";

const TodoItem = ({token, selectedDate, item, edit}) => {
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
                <svg className={s.check} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="checkmark">
                            <g id="checkmark-2" data-name="checkmark">
                                <path className="cls-2"
                                      d="M9.86,18a1,1,0,0,1-.73-.32L4.27,12.51a1,1,0,1,1,1.46-1.37l4.12,4.39,8.41-9.2a1,1,0,1,1,1.48,1.34l-9.14,10a1,1,0,0,1-.73.33Z"/>
                            </g>
                        </g>
                    </g>
                </svg>
            </button>
            <div className={s.content} onClick={() => edit(item)}>
                <div className={s.time}>
                    {item?.timeFrom && item?.timeTo
                        ?
                        item?.timeFrom + ' - ' + item?.timeTo
                        :
                        item?.timeFrom
                            ?
                            item?.timeFrom + ' - 0.00 '
                            :
                            item?.timeTo
                                ?
                                '0.00 - ' + item?.timeTo
                                :
                                ''
                    }
                </div>
                <div className={s.text}>
                    {item.text}
                </div>
            </div>
            <div className={s.delete}>
                <button onClick={deleteItem}>x</button>
            </div>
        </div>
    );
};

export default TodoItem;