import React, {Component} from 'react';
import {BrowserRouter, Route, Router, Switch} from 'react-router-dom';
import BasicHeader from "../components/BasicHeader";
import Home from "../views/Home";
import CreateEvent from "../views/CreateEvent";
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
import {connect} from 'react-redux';


class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{
                this.props.userAuthorised.userAuth ? <NavigationAuth/> : <NavigationNonAuth/>
            }</div>
        )
    }

}

const NavigationAuth = () => (
    <div className="App" style={{position: 'relative', minHeight: '100vh', backgroundColor: '#E9ECEF'}}>
        <BasicHeaderAuthorised/>
        <BrowserRouter>
            <Switch>
                <Route exact path={HOME} component={Home}/>
                <Route exact path={CREATE_EVENT} component={CreateEvent}/>
                <Route exact path={USER_PROFILE} component={UserProfile}/>
                <Route exact path={EXISTING_USER} component={UserProfile}/>
                <Route exact path={PAGE_NOT_AVAILABLE} component={PageNotAvailable}/>
                <Route exact path={SIGN_UP} component={SignUp}/>
                <Route exact path={SIGN_IN} component={SignIn}/>
            </Switch>
        </BrowserRouter>
    </div>
);

const NavigationNonAuth = () => (
    <div className="App" style={{position: 'relative', minHeight: '100vh', backgroundColor: '#E9ECEF'}}>
        <BasicHeader/>
        <BrowserRouter>
            <Switch>
                <Route exact path={HOME} component={Home}/>
                <Route exact path={PAGE_NOT_AVAILABLE} component={PageNotAvailable}/>
                <Route exact path={SIGN_UP} component={SignUp}/>
                <Route exact path={SIGN_IN} component={SignIn}/>
                <Route exact path={"*"} component={SignIn}/>
            </Switch>
        </BrowserRouter>
    </div>
);

const mapStateToProps = state => {
    return {userAuthorised: state.userAuthorised};
};

export default connect(mapStateToProps)(Navigation);
