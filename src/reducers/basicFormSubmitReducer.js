import {BASICFORM_SUBMIT} from "../constants/actionConstants";

const basicFormSubmitReducer = (state = [], action) => {
    console.log(action.payload);
    switch (action.type) {
        case BASICFORM_SUBMIT:
            return {
                ...state,
                formSubmitState: action.payload
            }
        default:
            return state;
    }
}

export default basicFormSubmitReducer;