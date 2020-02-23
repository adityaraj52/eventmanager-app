import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";
import {eventSlotList} from "../database/readabledatabase/eventList.js"
import {createFormControlSelectOptions} from "../Utils";
import Database from "../database/firebasedb/Database";
import {DATABASE_TABLES} from "../constants/OtherConstants";
import BootstrapTable from 'react-bootstrap-table-next';

const CREATE_EVENT_FORM_MEMBERS_NAME = {
    ORGANISER_NAME: "organiserName",
    LOCATION: "location",
    TIME: "time",
    DATE: "date",
    PARTICIPANTS: "participants",
    EVENT_CREATION_TIMESTAMP: "eventCreationTimeStamp"
};

const getTodayDate = () => {
    return new Date().toUTCString().substr(5, 11).split(' ').join(' ');
};


const getISOFormattedTodayDate = () => {
    return new Date().toISOString().substring(0, 10);
};

const getCurrentTime = () => {
    return new Date().toUTCString().substr(17,5).split(' ').join(' ');
};

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

const extractKeyValueFromArray = (array, key) => {
    let values = [];
    array.map(item => {
        values.push(item[key]);
    });
    return values;
};

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

const setUpBootstrapTable = (columnsToShow, isSortable, classNameForCells) => {
    let tableColumnData = [];
    columnsToShow.forEach(column => {
        tableColumnData.push({
            dataField: column.fieldName,
            text: column.aliasName,
            sort: !!isSortable,
            classes: classNameForCells
        })
    });
    return tableColumnData;
};

const generateFirebaseWritableObject = (object, columnNames) => {
    let returnObject = {};
    columnNames.map(item => {
        returnObject[item] = object[item]
    });
    return returnObject;
};

// Form component
class CreateEvent extends Component {
    constructor() {
        super();
        this.state = {
            organiserName: '',
            location: "",
            time: "",
            date: getISOFormattedTodayDate(),
            participants: "",
            eventCreationTimeStamp: "",
            tableData: []
        };
        this.setInitialState = this.setInitialState.bind(this);
        this.setInitialState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCreatedEvents = this.updateCreatedEvents.bind(this);
        this.setInitialState();
        this.updateCreatedEvents();
    }

    setInitialState() {
        this.setState({
            organiserName: '',
            location: "",
            time: "",
            date: getTodayDate(),
            participants: "",
            eventCreationTimeStamp: ""
        });
    }

    handleChange(e) {
        if (e.target.name === "organiserName") {
            this.state.participants = e.target.value;
        }
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

    handleSubmit(e) {
        e.preventDefault();
        let dataToWrite = generateFirebaseWritableObject(this.state, extractKeyValueFromArray(columnsToShow, 'fieldName'));
        dataToWrite[CREATE_EVENT_FORM_MEMBERS_NAME.EVENT_CREATION_TIMESTAMP] = getTodayDate()+' '+getCurrentTime();
        Database.writeToDatabase(DATABASE_TABLES.EVENT_INFO, this.state.organiserName, dataToWrite);
        this.updateCreatedEvents();
        this.setInitialState();
        console.log(this.state);
    }

    updateCreatedEvents() {
        let arrayTableData, databaseTableData,
            ref = Database.getInstance().ref().child(DATABASE_TABLES.EVENT_INFO);
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
                    <h2 style={{textAlign: 'center'}}>Add a new Event</h2>
                    <hr style={style.hrStyle}/>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Event Organiser</Form.Label>
                            <Form.Control name="organiserName" placeholder="Organiser"
                                          onChange={this.handleChange} required={true}
                                          value={this.state.organiserName}/>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Location</Form.Label>
                                <Form.Control name="location" placeholder="Event Location"
                                              onChange={this.handleChange} value={this.state.location}
                                              required={true}>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Time</Form.Label>

                                <Form.Control name="time" as="select" onChange={this.handleChange}
                                              value={this.state.time} required={true}>
                                    {createFormControlSelectOptions(eventSlotList, 'slot')}
                                </Form.Control>
                            </Form.Group>
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