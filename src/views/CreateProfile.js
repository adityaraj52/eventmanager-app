import React, {Component} from "react";
import {Button, Col, Form, Table} from "react-bootstrap";
import {eventSlotList} from "../database/readabledatabase/eventList.js"
import {createFormControlSelectOptions} from "../Utils";
import Database from "../database/firebasedb/Database";
import {DATABASE_TABLES} from "../constants/OtherConstants";
import BootstrapTable from 'react-bootstrap-table-next';

const EVENT_FORM_CONSTANTS = {
    EVENT_ORGANISER_NAME: "eventorganiserName",
    EVENT_LOCATION: "eventLocation",
    EVENT_TIME: "eventTime",
    EVENT_DATE: "eventDate",
    EVENT_PARTICIPANTS: "eventParticipants",
    EVENT_CREATED_AT: "eventCreatedAt"
};

// Form component
class CreateProfile extends Component {
    constructor() {
        super();

        this.state = {
            eventorganiserName: "",
            eventLocation: "",
            eventTime: "",
            eventDate: new Date().toISOString().substring(0, 10),
            eventParticipants: "",
            eventCreatedAt: "",
            databaseElements: [],
            bootstrapTableDatabaseElements: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCreatedEvents = this.updateCreatedEvents.bind(this);
        this.updateCreatedEvents();
    }

    handleChange(e) {
        if (e.target.name === "eventorganiserName") {
            this.state.eventParticipants = e.target.value;
        }
        if (e.target.name === "eventParticipants") {
            if (this.state.eventParticipants.substr(0, this.state.eventorganiserName.length) === this.state.eventorganiserName) {
                this.setState({
                    eventParticipants: e.target.value
                })
            } else {
                this.setState({
                    eventParticipants: this.state.eventorganiserName
                })
            }
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
        console.log(this.state)
    }

    handleSubmit(e) {
        e.preventDefault();
        Database.writeToDatabase(DATABASE_TABLES.EVENT_INFO, this.state.eventorganiserName, {
            eventorganiserName: this.state.eventorganiserName,
            eventLocation: this.state.eventLocation,
            eventTime: this.state.eventTime,
            eventDate: this.state.eventDate,
            eventParticipants: this.state.eventParticipants,
            eventCreatedAt: new Date().toUTCString().substr(5, 17)
        });
        this.setState({
            eventorganiserName: "",
            eventLocation: "",
            eventTime: "",
            eventDate: new Date().toISOString().substring(0, 10),
            eventParticipants: "",
            eventCreatedAt: "",
            databaseElements: []
        })
        this.updateCreatedEvents();
    }

    updateCreatedEvents() {
        let ref = Database.getInstance().ref().child('EVENT_INFO').orderByChild('eventDate');
        let listArray, counter, arrayBootstrapTableData;
        ref.on('value', (data) => {
            counter = 1;
            listArray = [];
            arrayBootstrapTableData = [];
            var databaseTable = data.val();
            if (databaseTable) {
                var keys = Object.keys(databaseTable);
                if (keys) {
                    for (let i = 0; i < keys.length; i++) {
                        var organiserName = keys[i];
                        var eventsByOrganiser = databaseTable[organiserName];
                        var keyseventsByOrganiser = Object.keys(eventsByOrganiser);
                        for (let j = 0; j < keyseventsByOrganiser.length; j++) {
                            var keysEventDetails = Object.keys(eventsByOrganiser[keyseventsByOrganiser[j]]);
                            let tempArray = [], bootstrapTableElementItem = {
                                SNo: counter++,
                                OrganiserName: eventsByOrganiser[keyseventsByOrganiser[j]]["eventorganiserName"],
                                Location: eventsByOrganiser[keyseventsByOrganiser[j]]["eventLocation"],
                                Time: eventsByOrganiser[keyseventsByOrganiser[j]]["eventTime"],
                                Date: eventsByOrganiser[keyseventsByOrganiser[j]]["eventDate"],
                                Participants: eventsByOrganiser[keyseventsByOrganiser[j]]["eventParticipants"],
                                CreatedAt: eventsByOrganiser[keyseventsByOrganiser[j]]["eventCreatedAt"]

                            };
                            arrayBootstrapTableData.push(bootstrapTableElementItem);

                            tempArray.push(<td>{counter}</td>);
                            let eventFormKeys = Object.keys(EVENT_FORM_CONSTANTS);
                            for (let eventFormKey of eventFormKeys) {
                                tempArray.push(
                                    <td style={{
                                        overflow: 'scroll',
                                        maxWidth: '100px'
                                    }}>{eventsByOrganiser[keyseventsByOrganiser[j]][EVENT_FORM_CONSTANTS[eventFormKey]]}</td>
                                )
                            }
                            listArray.push(<tr>{tempArray}</tr>)
                        }
                    }
                    this.setState({
                        databaseElements: listArray,
                        bootstrapTableDatabaseElements: arrayBootstrapTableData
                    });
                }
            }
        });
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
                            <Form.Control name="eventorganiserName" placeholder="Organiser"
                                          onChange={this.handleChange} required={true}
                                          value={this.state.eventorganiserName}/>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Location</Form.Label>
                                <Form.Control name="eventLocation" placeholder="Event Location"
                                              onChange={this.handleChange} value={this.state.eventLocation}
                                              required={true}>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Time</Form.Label>

                                <Form.Control name="eventTime" as="select" onChange={this.handleChange}
                                              value={this.state.eventTime} required={true}>
                                    {createFormControlSelectOptions(eventSlotList, 'slot')}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <label htmlFor="party">Date &nbsp;
                                    <input type="date" name="eventDate" min={"2020-02-01"} max="2022-04-30" style={{
                                        width: '100%', padding: '6px 12px', border: '1px solid #ced4da',
                                        borderRadius: '.25rem', marginRight: '0'
                                    }} onChange={this.handleChange} value={this.state.eventDate} required="true"/>
                                </label>
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Attending Participants</Form.Label>
                                <Form.Control as={"textarea"} rows="5" name="eventParticipants"
                                              onChange={this.handleChange} placeholder={"John, Rose, Dalphia"}
                                              value={this.state.eventParticipants}/>
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

                </div>


            </div>
        );
    }
}

export default CreateProfile;