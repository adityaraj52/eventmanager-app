import {combineReducers} from 'redux';
import userAuthorisationReducer from './userAuthorisationReducer';
import basicFormSubmitReducer from "./basicFormSubmitReducer";
import basicFormStateMapper from "./basicFormStateMapper";
import userInformationMapper from "./userInformationMapper";


export default combineReducers({
    userAuthorised: userAuthorisationReducer,
    basicFormSubmitState: basicFormSubmitReducer,
    basicFormState: basicFormStateMapper,
    userInformation: userInformationMapper
});