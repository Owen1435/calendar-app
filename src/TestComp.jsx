import React, {useEffect, useState} from 'react';

const TestComp = ({curValue, setCurValue}) => {
    const [value, setValue] = useState(curValue)

    useEffect(() => setValue(curValue), [curValue])

    return (
        <div>
            <div>{value?.id + '___' + value?.content}</div>
            <button onClick={() => setValue({...value, content: value.content + 1})}> + </button>
            {/*<button onClick={() => setCurValue({...value, id: value.id + 1})}>changeCurValue</button>*/}
            <button onClick={() => setCurValue(value.id + 1)}>changeCurValue</button>

        </div>
    );
};

export default TestComp;