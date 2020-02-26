import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";
import {DATABASE_TABLES} from "../constants/OtherConstants";
import {extractKeyValueFromArray, generateFirebaseWritableObject} from "../Utils";

const CREATE_ADD_USER_FORM_MEMBERS_NAME = {
    NAME: 'name',
    CONTACT: 'contact',
    STATUS: 'status',
    CHAT_ID: 'chatId',
    WALLET_BALANCE: 'walletBalance',
    REGISTERED_EVENTS: 'registeredEvents',
    LAST_10_GAMES_PLAYED: 'last10gamesPlayed',
    EXTRAS: 'extras',
    ADDRESS: 'address',
    EMAIL: 'email',
    WHATSAPP_ID: 'whatsappId',
    PASSWORD: 'password'
};

const columnsToShow = [
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.NAME,
        aliasName: 'Name'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.CONTACT,
        aliasName: 'Contact'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.STATUS,
        aliasName: 'Status'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.CHAT_ID,
        aliasName: 'ChatId'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.WALLET_BALANCE,
        aliasName: 'Wallet Balance'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.REGISTERED_EVENTS,
        aliasName: 'Registered Events'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.LAST_10_GAMES_PLAYED,
        aliasName: 'Contact'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.EXTRAS,
        aliasName: 'Status'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.ADDRESS,
        aliasName: 'ChatId'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.EMAIL,
        aliasName: 'Wallet Balance'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.WHATSAPP_ID,
        aliasName: 'Registered Events'
    },
    {
        fieldName: CREATE_ADD_USER_FORM_MEMBERS_NAME.PASSWORD,
        aliasName: 'Password'
    }
];

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            contact: "",
            status: '',
            chatId: "",
            walletBalance: 0,
            registeredEvents: 0,
            last10gamesPlayed: 0,
            extras: "",
            address: "",
            email: "",
            whatsappId: "",
            formSuccess: false,
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
    }

    setInitialState() {
        this.setState({
            name: "",
            contact: "",
            status: '',
            chatId: "",
            walletBalance: 0,
            registeredEvents: 0,
            last10gamesPlayed: 0,
            extras: "",
            address: "",
            email: "",
            whatsappId: "",
            password: ""
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let dataToWrite = generateFirebaseWritableObject(this.state, extractKeyValueFromArray(columnsToShow, 'fieldName'));
        //this.updateCreatedEvents();
        this.setInitialState();
        this.state.formSuccess = true;
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    updateCreatedEvents() {
        let arrayTableData, databaseTableData, ref;
        if (ref) {
            ref.on('value', (data) => {
                arrayTableData = [];
                databaseTableData = data.val();
                if (databaseTableData) {
                    Object.keys(databaseTableData).forEach(entry => {
                        Object.keys(databaseTableData[entry]).forEach(entryItem => {
                            let tableRow = {}, entryItemDetail = databaseTableData[entry][entryItem];
                            extractKeyValueFromArray(columnsToShow, 'fieldName').forEach(columnName => {
                                tableRow[columnName] = entryItemDetail[columnName];
                            });
                            arrayTableData.push(tableRow);
                        })
                    });
                    this.setState({
                        tableData: arrayTableData
                    });
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className="col-md-8 offset-md-2">
                    <h2 style={{textAlign: 'center'}}>Membership Zone</h2>

                    <Form onSubmit={this.handleSubmit} success={this.state.formSuccess} error={this.state.formError}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={this.handleChange}
                                              value={this.state[CREATE_ADD_USER_FORM_MEMBERS_NAME.NAME]}
                                              name={CREATE_ADD_USER_FORM_MEMBERS_NAME.NAME}
                                              placeholder="Enter your Name" required={true}/>
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={this.handleChange}
                                              value={this.state[CREATE_ADD_USER_FORM_MEMBERS_NAME.EMAIL]}
                                              name={CREATE_ADD_USER_FORM_MEMBERS_NAME.EMAIL} type="email"
                                              placeholder="Enter email"
                                              required={true}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={this.handleChange}
                                              value={this.state[CREATE_ADD_USER_FORM_MEMBERS_NAME.PASSWORD]}
                                              name={CREATE_ADD_USER_FORM_MEMBERS_NAME.PASSWORD} placeholder="Password "
                                              required={true}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Contact</Form.Label>
                                <Form.Control onChange={this.handleChange}
                                              value={this.state[CREATE_ADD_USER_FORM_MEMBERS_NAME.CONTACT]}
                                              name={CREATE_ADD_USER_FORM_MEMBERS_NAME.CONTACT} type="contact"
                                              placeholder="+49123456789"
                                              required={true}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>WhatsappChat ID</Form.Label>
                                <Form.Control onChange={this.handleChange}
                                              value={this.state[CREATE_ADD_USER_FORM_MEMBERS_NAME.WHATSAPP_ID]}
                                              name={CREATE_ADD_USER_FORM_MEMBERS_NAME.WHATSAPP_ID}
                                              placeholder="WhatsappContact"
                                              required="optional"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={this.handleChange}
                                          value={this.state[CREATE_ADD_USER_FORM_MEMBERS_NAME.ADDRESS]}
                                          name={CREATE_ADD_USER_FORM_MEMBERS_NAME.ADDRESS} placeholder="1234 Main St"
                                          required={true}/>
                        </Form.Group>

                        <Form.Row style={{textAlign: 'center'}}>
                            <Form.Group as={Col}>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                            </Form.Group>
                        </Form.Row>
                    </Form>

                    <div>
                        {
                            this.state.formSuccess ? <SuccessfulMessage/> : <p/>
                        }
                    </div>

                </div>
            </div>
        )
    }
}

const SuccessfulMessage = (props) => ({
    render: function () {
        return (
            <div className="ui success message">
                <i className="close icon"></i>
                <div className="header">
                    Your user registration was successful.
                </div>
                <p>You may now log-in with the username and password you have chosen</p>
            </div>);
    }
});

const ErrorMessage = (props) => ({
    render: function () {
        return (
            <div className="ui negative message">
                <i className="close icon"></i>
                <div className="header">
                    There was a problem in Account Creation.
                </div>
                <p>Please check if you have correctly filled all the fields or report this to us.
                </p></div>
        );
    }
});


export default UserProfile;