import {CREATE_EVENT} from "../constants/routes";

const createEventReducer = (state=[], action) => {
    switch (action.type) {
        case CREATE_EVENT: return {
            ...state,
            item: action.payload
        }
        default: return state;
    }
}

export default createEventReducer;