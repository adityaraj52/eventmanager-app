import React, {Component} from "react";
import {Container} from "react-bootstrap";
import {DATABASE_TABLES, FormInputType, style} from "../constants/OtherConstants";
import {withFirebase} from '../components/Firebase';
import BasicForm from "../components/BasicForm";
import {createFormElement} from "../Utils";

const INITIAL_STATE = {
    displayName: "",
    phoneNumber: "",
    email: "",
    secondaryEmail: "",
    whatsappNumber: "",
    eventsParticipated: [],
    eventsOrganised: [],
    walletBalance: 0,
};

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        let dataToWrite = {};
        dataToWrite = {...data};
        console.log('success msg is ', dataToWrite.error, dataToWrite.success);
        delete dataToWrite.success;
        delete dataToWrite.error;
        if (this.props.firebase.doSetUserProfileInfo(dataToWrite))
            this.setState({
                    error: 'Profile Updated  '
                }
            );
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount() {
        this.setState({
            displayName: this.props.firebase.doGetUserDisplayName(),
            email: this.props.firebase.doGetUserEmail()
        });
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.USER_PROFILE + '/' + this.props.firebase.doGetUserId());
        if (ref) {
            ref.on('value', (data) => {
                if (data.val()) {
                    this.setState(data.val())
                }
            })
        }
        return this.state;
    }

    render() {
        return (
            <div>
                <Container style={{padding: "20px"}}>
                    <h2 style={{textAlign: 'center'}}>Your Account</h2>
                    <hr style={style.hrStyle}/>

                    <BasicForm
                        formElementArray={
                            {
                                0: [createFormElement({
                                    label: 'Name',
                                    name: 'displayName',
                                    disabled: true
                                }, FormInputType.TEXT)],
                                1: [createFormElement({
                                    label: 'Your Email',
                                    name: 'email',
                                    disabled: true
                                }, FormInputType.EMAIL),
                                    createFormElement({
                                        label: 'Secondary Email',
                                        name: 'secondaryEmail',
                                    }, FormInputType.EMAIL)],
                                2: [createFormElement({
                                    label: 'Phone',
                                    name: 'phoneNumber',
                                    placeholder: 'Telephone',
                                    isRequired: true
                                }, FormInputType.NUMBER),
                                    createFormElement({
                                        label: 'Skype',
                                        name: 'skype',
                                        placeholder: 'Skype'
                                    }, FormInputType.TEXT)],
                                3: [createFormElement({
                                    label: 'Address',
                                    name: 'address'
                                }, FormInputType.TEXT)
                                ],
                                4: [createFormElement({
                                    label: 'Facebook',
                                    name: 'facebook',
                                    placeholder: 'facebook.com/****'
                                }, FormInputType.TEXT),
                                    createFormElement({
                                        label: 'LinkedIn',
                                        name: 'linkedin',
                                        placeholder: 'linkedin.com/in/****'
                                    }, FormInputType.TEXT),
                                    createFormElement({
                                        label: 'Twitter',
                                        name: 'twitter',
                                        placeholder: '@xyz'
                                    }, FormInputType.TEXT)
                                ]
                            }
                        }
                        callBackComponentDidMount={this.props.firebase.database.ref(DATABASE_TABLES.USER_PROFILE + '/' + this.props.firebase.doGetUserId())}
                        additionalParams={{
                            displayName: this.props.firebase.doGetUserDisplayName(),
                            email: this.props.firebase.doGetUserEmail()
                        }}
                        submitHandler={this.handleSubmit}/>
                    {this.state.error && <h3 style={{color: 'green'}}>{this.state.error}</h3>}
                </Container>

            </div>
        )
    }
}

export default withFirebase(UserProfile);
