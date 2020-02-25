import React, {Component} from 'react';
import {Provider} from "react-redux";
import store from "../store";
import Navigation from "../components/Navigation";
import {withFirebase} from '../components/Firebase';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {
    CREATE_EVENT,
    EXISTING_USER,
    HOME,
    PAGE_NOT_AVAILABLE,
    SIGN_IN,
    SIGN_UP,
    USER_PROFILE
} from "../constants/routes";
import Home from "../views/Home";
import CreateEvent from "../views/CreateEvent";
import UserProfile from "../views/UserProfile";
import ExistingUser from "../views/ExistingUser";
import PageNotAvailable from "../views/PageNotAvailable";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({authUser})
                : this.setState({authUser: null});
        });
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Navigation/>
                    <BrowserRouter>
                    <Switch>
                        <Route exact path={HOME} component={Home}/>
                        <Route exact path={CREATE_EVENT} component={CreateEvent}/>
                        <Route exact path={USER_PROFILE} component={UserProfile}/>
                        <Route exact path={EXISTING_USER} component={ExistingUser}/>
                        <Route exact path={PAGE_NOT_AVAILABLE} component={PageNotAvailable}/>
                        <Route exact path={SIGN_UP} component={SignUp}/>
                        <Route exact path={SIGN_IN} component={SignIn}/>
                    </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default withFirebase(App);
