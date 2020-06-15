import {
    AUTHORISE_USER,
    BASICFORM_STATE,
    BASICFORM_SUBMIT,
    GET_EVENT_DETAILS,
    USER_INFORMATION
} from "../constants/actionConstants";

export const doUserAuthorisation = (payload) => {
    return {
        type: AUTHORISE_USER,
        payload
    }
};

export const doBasicFormSubmit = (payload, callback) => {
    callback(payload);
    return {
        type: BASICFORM_SUBMIT,
        payload
    }
};
export const getEventDetails = (payload) => {
    return {
        type: GET_EVENT_DETAILS,
        payload
    }
};

export const doSetBasicFormStateElement = (payload) => {
    return {
        type: BASICFORM_STATE,
        payload
    }
};

export const doSaveUserInformation = (payload) => {
    return {
        type: USER_INFORMATION,
        payload
    }
};
