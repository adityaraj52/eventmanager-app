import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";
import {eventSlotList, participantsNameAndContact} from "../database/readabledatabase/eventList.js"
import {createFormControlSelectOptions} from "../Utils";

// Form component
class CreateEvent extends Component {
    constructor() {
        super();

        this.state = {
            eventorganiserName: "",
            eventLocation: "",
            eventSlot: "",
            eventParticipants: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {eventorganiserName} = this.state.eventorganiserName;
        const {eventLocation} = this.state.eventLocation;
        const {eventSlot} = this.state.eventSlot;
        const {eventParticipants} = this.state.eventParticipants;

        this.props.addEvent({
            eventorganiserName,
            eventLocation,
            eventSlot,
            eventParticipants
        });

        this.setState({
            eventorganiserName,
            eventLocation,
            eventSlot,
            eventParticipants
        })
    }

    render() {
        return (
            <div>
                <div className="col-md-8 offset-md-2">
                    <h2>Add a new Event</h2>

                    <Form>
                        <Form.Group>
                            <Form.Label>Event Organiser</Form.Label>
                            <Form.Control id="eventorganiserName" placeholder="Organiser Name"
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Event Location</Form.Label>
                                <Form.Control id="eventLocation" placeholder="WaldSchulAllee 71, Berlin"
                                              onChange={this.handleChange}>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} style={{display: this.state.shouldHide ? 'none' : ''}}>
                                <Form.Label>Event Slot</Form.Label>
                                <Form.Control id="eventSlot" as="select" onChange={this.handleChange}>
                                    {createFormControlSelectOptions(eventSlotList, 'slot')}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Attending Participants</Form.Label>
                                <Form.Control id="eventParticipants" as="select" onChange={this.handleChange}
                                              multiple="multiple">
                                    {createFormControlSelectOptions(participantsNameAndContact, "name")}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CreateEvent;