import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";
import {eventSlotList} from "../database/readabledatabase/eventList.js"
import {
    createFormControlSelectOptions,
    extractKeyValueFromArray,
    generateFirebaseWritableObject,
    getCurrentTime,
    getISOFormattedTodayDate,
    getTodayDate,
    setUpBootstrapTable
} from "../Utils";
import Database from "../database/firebasedb/Database";
import {DATABASE_TABLES} from "../constants/OtherConstants";
import BootstrapTable from 'react-bootstrap-table-next';
import firebase from "firebase";

const CREATE_EVENT_FORM_MEMBERS_NAME = {
    ORGANISER_NAME: "organiserName",
    LOCATION: "location",
    TIME: "time",
    DATE: "date",
    PARTICIPANTS: "participants",
    EVENT_CREATION_TIMESTAMP: "eventCreationTimeStamp"
};

//TODO: ADD FEATURE
// TO ALLOW USERS TO POSTPAY FOR THE EVENT
// PRICE FOR THE EVENT
// DROPDOWN FOR ORGANISER NAME
// Add Methods to fetch specific information from database like get user profileInfo and so on

const columnsToShow = [
    {
        fieldName: CREATE_EVENT_FORM_MEMBERS_NAME.ORGANISER_NAME,
        aliasName: 'Organiser'
    },
    {
        fieldName: CREATE_EVENT_FORM_MEMBERS_NAME.LOCATION,
        aliasName: 'Location'
    },
    {
        fieldName: CREATE_EVENT_FORM_MEMBERS_NAME.TIME,
        aliasName: 'Time'
    },
    {
        fieldName: CREATE_EVENT_FORM_MEMBERS_NAME.DATE,
        aliasName: 'Date'
    },
    {
        fieldName: CREATE_EVENT_FORM_MEMBERS_NAME.EVENT_CREATION_TIMESTAMP,
        aliasName: 'Timestamp'
    },
    {
        fieldName: CREATE_EVENT_FORM_MEMBERS_NAME.PARTICIPANTS,
        aliasName: 'Participants'
    }
];

const style = {
    hrStyle: {
        display: 'block',
        marginTop: '0.5em',
        marginBottom: '0.5em',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderStyle: 'inset',
        borderWidth: '1px',
        borderColor: 'gray'
    }
};

// Form component
class CreateEvent extends Component {
    constructor() {
        super();
        this.state = {
            organiserName: '',
            authenticationPin: '',
            location: "",
            time: eventSlotList[6].slot,
            date: getISOFormattedTodayDate(),
            participants: "",
            eventCreationTimeStamp: "",
            tableData: [],
            registeredUsers: {},
            isAuthenticatedUser: false
        };
        this.setInitialState = this.setInitialState.bind(this);
        this.setInitialState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getRegisteredUsersName = this.getRegisteredUsersName.bind(this);
        this.updateCreatedEvents = this.updateCreatedEvents.bind(this);
        this.setInitialState();
        this.getRegisteredUsersName();
        this.updateCreatedEvents();
    }

    setInitialState() {
        this.setState({
            organiserName: '',
            location: "",
            time: eventSlotList[6].slot,
            date: getISOFormattedTodayDate(),
            participants: "",
            eventCreationTimeStamp: ""
        });
    }

    isUserAuthenticated() {

    }

    handleChange(e) {
        if (e.target.name === "organiserNameAndEmail") {
            let modifiedTargetValue = e.target.value.split(',')[0];
            this.state.organiserName = modifiedTargetValue;
            this.state.participants = modifiedTargetValue;
            this.state.organiserName = modifiedTargetValue;
        } else {
            if (e.target.name === "participants") {
                if (this.state.participants.substr(0, this.state.organiserName.length) === this.state.organiserName) {
                    this.setState({
                        participants: e.target.value
                    })
                } else {
                    this.setState({
                        participants: this.state.organiserName
                    })
                }
            } else {
                this.setState({[e.target.name]: e.target.value});
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let dataToWrite = generateFirebaseWritableObject(this.state, extractKeyValueFromArray(columnsToShow, 'fieldName'));
        dataToWrite[CREATE_EVENT_FORM_MEMBERS_NAME.EVENT_CREATION_TIMESTAMP] = getTodayDate() + ' ' + getCurrentTime();
        Database.pushToDatabase(DATABASE_TABLES.EVENT_INFO, this.state.organiserName, dataToWrite);
        this.updateCreatedEvents();
        this.setInitialState();
    }

    updateCreatedEvents() {
        let arrayTableData, databaseTableData;
        let ref = firebase.database().ref().child(DATABASE_TABLES.EVENT_INFO);
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

    getRegisteredUsersName() {
        let arrayTableData, databaseTableData,
            ref = firebase.database().ref().child(DATABASE_TABLES.USER_PROFILE);
        if (ref) {
            ref.on('value', (data) => {
                arrayTableData = [];
                databaseTableData = data.val();
                if (databaseTableData) {
                    Object.keys(databaseTableData).forEach(entry => {
                        let rowObject = {}, entryItemDetail = databaseTableData[entry];
                        rowObject["name"] = entryItemDetail["name"] + ', e: ' + entryItemDetail["email"];
                        arrayTableData.push(rowObject);
                    });
                    this.setState({
                        registeredUsers: arrayTableData
                    });
                    console.log('state is ', this.state);
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className="col-md-8 offset-md-2">
                    <h2 style={{textAlign: 'center'}}>Add a new Event</h2>
                    <hr style={style.hrStyle}/>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Organiser</Form.Label>
                                <Form.Control name="organiserNameAndEmail" as="select" onChange={this.handleChange}
                                              required={true}>
                                    {createFormControlSelectOptions(this.state.registeredUsers, 'name')}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Authentication Pin</Form.Label>
                                <Form.Control name="authenticationPin" placeholder="Your Authentication Pin"
                                              onChange={this.handleChange} value={this.state.authenticationPin}
                                              type={"password"}
                                              required={true}>
                                </Form.Control>
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Location</Form.Label>
                                <Form.Control name="location" placeholder="Event Location"
                                              onChange={this.handleChange} value={this.state.location}
                                              required={true}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Time</Form.Label>

                                <Form.Control name="time" as="select" onChange={this.handleChange}
                                              value={this.state.time} required={true}>
                                    {createFormControlSelectOptions(eventSlotList, 'slot')}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <label htmlFor="party">Date &nbsp;
                                    <input type="date" name="date" min={"2020-02-01"} max="2022-04-30" style={{
                                        width: '100%', padding: '6px 12px', border: '1px solid #ced4da',
                                        borderRadius: '.25rem', marginRight: '0'
                                    }} onChange={this.handleChange} value={this.state.date} required={true}/>
                                </label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Attending Participants</Form.Label>
                                <Form.Control as={"textarea"} rows="5" name="participants"
                                              onChange={this.handleChange} placeholder={"John, Rose, Dalphia"}
                                              value={this.state.participants}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row style={{textAlign: 'center'}}>
                            <Form.Group as={Col}>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>

                    <h2 style={{textAlign: 'center'}}>Existing Events</h2>
                    <hr style={style.hrStyle}/>
                    <div className="">
                        <table className="table-responsive table-light">
                            <BootstrapTable keyField='createdAt'
                                            columns={setUpBootstrapTable(columnsToShow, true, 'bootstrapEditableTable')}
                                            data={this.state.tableData}/>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEvent;