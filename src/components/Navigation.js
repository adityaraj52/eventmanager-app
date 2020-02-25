import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import BasicHeader from "../components/BasicHeader";
import Home from "../views/Home";
import CreateEvent from "../views/CreateEvent";
import ExistingUser from "../views/ExistingUser";
import UserProfile from "../views/UserProfile";
import PageNotAvailable from "../views/PageNotAvailable";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import {
    CREATE_EVENT,
    EXISTING_USER,
    HOME,
    PAGE_NOT_AVAILABLE,
    SIGN_IN,
    SIGN_UP,
    USER_PROFILE
} from '../constants/routes';
import BasicHeaderAuthorised from "./BasicHeaderAuthorised";

const Navigation = ({authUser}) => (

    <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
    <div className="App" style={{position: 'relative', minHeight: '100vh', backgroundColor: '#E9ECEF'}}>
        <BasicHeader/>
    </div>
);

const NavigationNonAuth = () => (
    <div className="App" style={{position: 'relative', minHeight: '100vh', backgroundColor: '#E9ECEF'}}>
                <BasicHeaderAuthorised/>

    </div>
);

export default Navigation;
