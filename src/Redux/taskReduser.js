import {ADD_TASK} from './types'

//action = {type: '', payload: ''}
function taskReduser(state = [], action) {
    switch (action.type) {
        case ADD_TASK:

        default:
            return state
    }
}

export default taskReduser