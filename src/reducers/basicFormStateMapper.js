import {BASICFORM_STATE} from "../constants/actionConstants";

const basicFormStateMapper = (state = [], action) => {
    switch (action.type) {
        case BASICFORM_STATE:
            Object.keys(action.payload).reduce((a, e) => (a[e] = action.payload[e], a), state);
            return {...state};
        default:
            return state;
    }
}

export default basicFormStateMapper;