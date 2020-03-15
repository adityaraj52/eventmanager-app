import React, {Component} from "react";
import {createFormControlSelectOptions, getISOFormattedTodayDate, yesnoSelectOption} from "../Utils";
import {DATABASE_TABLES, style} from "../constants/OtherConstants";
import {withFirebase} from '../components/Firebase';
import {Button, Col, Form} from "react-bootstrap";
import {UPCOMING_EVENT} from "../constants/routes";

//TODO: ADD FEATURE
// TO ALLOW USERS TO POSTPAY FOR THE EVENT
// PRICE FOR THE EVENT
// DROPDOWN FOR ORGANISER NAME
// Add Methods to fetch specific information
//from database like get user profileInfo and so on


const INITIAL_STATE = {
    eventStartTime: "17:00",
    eventEndTime: "22:30",
    eventId: "",
    eventDate: getISOFormattedTodayDate(),
    eventType: "",
    eventParticipant: [],
    eventLocation: "",
    eventOrganiser: "",
    eventOrganiserPhone: "",
    eventOrganiserEmail: "",
    eventCost: "",
    eventCostSplitEqually: "Yes",
    eventUrl: "",
    eventDetails: "",
    eventPriority: "",
    eventModePrivate: "No",
    error: null
};


// Form component
class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.resetState()
    }

    resetState() {
        this.setState({...INITIAL_STATE});
        this.setState({
            eventOrganiser: this.props.firebase.doGetUserDisplayName(),
            eventOrganiserPhone: this.props.firebase.doGetUserPhoneNumber(),
            eventOrganiserEmail: this.props.firebase.doGetUserEmail(),
        });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let userId = this.props.firebase.doGetUserId();
        this.state.eventId = userId + Math.floor(Date.now() + Math.random());
        this.state.eventParticipant.push({
            name: this.state.eventOrganiser,
            uid: userId
        });
        this.resetState();
        this.props.firebase.doSetInDataBase(DATABASE_TABLES.EVENT_INFO, this.state)
            .then(() => {
                if (this.state.eventModePrivate === "No") {
                    this.props.history.push(UPCOMING_EVENT)
                }
            })
            .catch(errorMessage => {
                this.setState({errorMessage})
            });
        this.setState({errorMessage: "Event Successfully Created"});
    }

    render() {
        return (
            <div style={{padding: '5px'}}>
                <div className="col-md-8 offset-md-2">
                    <h2 style={{textAlign: 'center'}}>Add a new Event</h2>
                    <hr style={style.hrStyle}/>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Organiser</Form.Label>
                                <Form.Control name="eventOrganiser"
                                              value={this.state.eventOrganiser}
                                              disabled>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Organiser Email</Form.Label>
                                <Form.Control name="eventOrganiserEmail"
                                              value={this.state.eventOrganiserEmail}
                                              disabled>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <label htmlFor="party">Event Date &nbsp;
                                    <input type="date" name="eventDate" min={"2020-02-01"} max="2022-04-30" style={{
                                        width: '100%', padding: '6px 12px', border: '1px solid #ced4da',
                                        borderRadius: '.25rem', marginRight: '0'
                                    }} onChange={this.handleChange} value={this.state.eventDate} required={true}/>
                                </label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Location</Form.Label>
                                <Form.Control name="eventLocation"
                                              value={this.state.eventLocation} placeholder={"123 Street, London"}
                                              onChange={this.handleChange} required={true}>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Start Time</Form.Label>
                                <Form.Control name="eventStartTime"
                                              value={this.state.eventStartTime} type="time" placeholder={"12:00-14:00"}
                                              onChange={this.handleChange} required={true}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Event End Time</Form.Label>
                                <Form.Control name="eventEndTime"
                                              value={this.state.eventEndTime} type="time" placeholder={"12:00-14:00"}
                                              onChange={this.handleChange} required={true}>
                                </Form.Control>
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Cost</Form.Label>
                                <Form.Control name="eventCost" type={"number"}
                                              value={this.state.eventCost} placeholder={"Event Cost"}
                                              onChange={this.handleChange} required={true}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Split Equally</Form.Label>
                                <Form.Control name="eventCostSplitEqually" as="select" onChange={this.handleChange}
                                              value={this.state.eventCostSplitEqually} required={true}>
                                    {createFormControlSelectOptions(yesnoSelectOption, 'key', 'value')} required={true}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Private Event</Form.Label>
                                <Form.Control name="eventModePrivate" as="select" onChange={this.handleChange}
                                              value={this.state.eventModePrivate} required={true}>
                                    {createFormControlSelectOptions(yesnoSelectOption, 'key', 'value')} required={true}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Details</Form.Label>
                                <Form.Control as={"textarea"} rows="3" name="eventDetails" onChange={this.handleChange}
                                              value={this.state.eventDetails}
                                              placeholder={"Provide any other useful information about the event(e.g. payment information)"}>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row style={{textAlign: 'center'}}>
                            <Form.Group as={Col}>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form.Row>

                        {this.state.errorMessage && <h3 style={{color: 'green'}}>{this.state.errorMessage}</h3>}

                    </Form>
                </div>
            </div>
        );
    }
}


export default withFirebase(CreateEvent);