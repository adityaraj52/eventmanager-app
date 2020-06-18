import React, {Component} from 'react';
import {connect} from "react-redux";
import Navigation from "../components/Navigation";
import {withFirebase} from '../components/Firebase';
import {doSaveUserInformation, doUserAuthorisation} from '../actions';


class App extends Component {
    componentDidMount() {
        this.props.firebase.authenticationCallBack(this.props.firebase.auth.onAuthStateChanged(userAuthenticationStatus => {
            if(userAuthenticationStatus && userAuthenticationStatus.emailVerified){
                this.props.doUserAuthorisation(userAuthenticationStatus);
                this.props.doSaveUserInformation({
                    eventOrganiser: this.props.firebase.doGetUserDisplayName(),
                    eventOrganiserPhone: this.props.firebase.doGetUserPhoneNumber(),
                    eventOrganiserEmail: this.props.firebase.doGetUserEmail(),
                });
            }
        }));
    }

    render() {
        return (
            <div>
                <Navigation userAuthorised={this.props.userAuthorised}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doUserAuthorisation: (userAuthenticationStatus) => dispatch(doUserAuthorisation(userAuthenticationStatus)),
        doSaveUserInformation: (payload) => dispatch(doSaveUserInformation(payload))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withFirebase(App));
