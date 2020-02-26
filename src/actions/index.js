import {AUTHORISE_USER} from "../constants/actionConstants";

export const doUserAuthorisation = (payload) => {
    return {
        type: AUTHORISE_USER,
        payload
    }
}