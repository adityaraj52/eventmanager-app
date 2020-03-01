import {AUTHORISE_USER, GET_EVENT_DETAILS} from "../constants/actionConstants";

export const doUserAuthorisation = (payload) => {
    return {
        type: AUTHORISE_USER,
        payload
    }
};
export const getEventDetails = (payload) => {
    return {
        type: GET_EVENT_DETAILS,
        payload
    }
};
