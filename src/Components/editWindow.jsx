import React from 'react';
import s from "./EditWindow.module.scss";
import {Button, TextField} from "@mui/material";

const EditWindow = ({title, setTitle, timeFrom, setTimeFrom, timeTo, setTimeTo, cancel, name, funcItem}) => {
    return (
        <div className={s.editWindow}>
            <TextField value={title} onChange={e => setTitle(e.target.value)} label="Text" variant="outlined"/>
            <div className={s.timeBlock}>
                <TextField value={timeFrom} onChange={e => setTimeFrom(e.target.value)} label="Time from"
                           variant="outlined"/>
                <TextField value={timeTo} onChange={e => setTimeTo(e.target.value)} label="Time to"
                           variant="outlined"/>
            </div>
            <div className={s.addBtn}>
                <Button variant="contained" onClick={funcItem}>{name}</Button>
            </div>
            <div className={s.cancelBtn}>
                <Button variant="outlined" color="error" onClick={cancel}>cancel</Button>
            </div>
        </div>
    );
};

export default EditWindow;