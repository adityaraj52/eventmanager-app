import React, {Component} from 'react';
import {connect} from "react-redux";
import Navigation from "../components/Navigation";
import {withFirebase} from '../components/Firebase';
import {doUserAuthorisation} from '../actions';


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.listener = this.props.firebase.authenticationCallBack(this.props.firebase.auth.onAuthStateChanged(userAuthenticationStatus => {
            this.props.doUserAuthorisation(userAuthenticationStatus)
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
        doUserAuthorisation: (userAuthenticationStatus) => dispatch(doUserAuthorisation(userAuthenticationStatus))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withFirebase(App));
