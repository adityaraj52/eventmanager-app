import React, {Component} from 'react';
import {BrowserRouter, Route, Router, Switch} from 'react-router-dom';
import BasicHeader from "../components/BasicHeader";
import Home from "../views/Home";
import CreateEvent from "../views/CreateEvent";
import UserProfile from "../views/UserProfile";
import PageNotAvailable from "../views/PageNotAvailable";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import * as ROUTES from '../constants/routes';
import BasicHeaderAuthorised from "./BasicHeaderAuthorised";
import {connect} from 'react-redux';
import UpComingEvents from "../views/UpComingEvents";
import ShowEvent from "../views/ShowEvent";


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
                <Route exact path={ROUTES.HOME} component={Home}/>
                <Route exact path={ROUTES.CREATE_EVENT} component={CreateEvent}/>
                <Route exact path={ROUTES.UPCOMING_EVENT} component={UpComingEvents}/>
                <Route exact path={ROUTES.USER_PROFILE} component={UserProfile}/>
                <Route exact path={ROUTES.EXISTING_USER} component={UserProfile}/>
                <Route exact path={ROUTES.PAGE_NOT_AVAILABLE} component={PageNotAvailable}/>
                <Route exact path={ROUTES.SIGN_UP} component={SignUp}/>
                <Route exact path={ROUTES.SIGN_IN} component={SignIn}/>
                <Route exact path={ROUTES.SHOW_EVENT} component={ShowEvent}/>
            </Switch>
        </BrowserRouter>
    </div>
);

const NavigationNonAuth = () => (
    <div className="App" style={{position: 'relative', minHeight: '100vh', backgroundColor: '#E9ECEF'}}>
        <BasicHeader/>
        <BrowserRouter>
            <Switch>
                <Route exact path={ROUTES.HOME} component={Home}/>
                <Route exact path={ROUTES.PAGE_NOT_AVAILABLE} component={PageNotAvailable}/>
                <Route exact path={ROUTES.SIGN_UP} component={SignUp}/>
                <Route exact path={ROUTES.SIGN_IN} component={SignIn}/>
                <Route exact path={"*"} component={SignIn}/>
            </Switch>
        </BrowserRouter>
    </div>
);

const mapStateToProps = state => {
    return {userAuthorised: state.userAuthorised};
};

export default connect(mapStateToProps)(Navigation);
