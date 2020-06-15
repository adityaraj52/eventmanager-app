import {USER_INFORMATION} from "../constants/actionConstants";

const userInformationMapper = (state = [], action) => {
    switch (action.type) {
        case USER_INFORMATION:
            return {...state,
                userProfile: action.payload
            };
        default:
            return state;
    }
}

export default userInformationMapper;