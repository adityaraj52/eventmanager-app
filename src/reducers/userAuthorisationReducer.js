import {AUTHORISE_USER} from "../constants/actionConstants";

const createAuthoriseUserReducer = (state = [], action) => {
    switch (action.type) {
        case AUTHORISE_USER:
            return {
                ...state,
                userAuth: action.payload
            }
        default:
            return state;
    }
}

export default createAuthoriseUserReducer;