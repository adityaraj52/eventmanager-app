import {combineReducers} from 'redux';
import userAuthorisationReducer from './userAuthorisationReducer';


export default combineReducers({
    userAuthorised: userAuthorisationReducer
});