import React, {Component} from 'react';
import {withFirebase} from '../components/Firebase';
import * as ROUTES from '../constants/routes';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {DATABASE_TABLES, style} from "../constants/OtherConstants";
import {Link} from "react-router-dom";
import {doUserAuthorisation} from "../actions";
import {connect} from "react-redux";

const INITIAL_STATE = {
    eventId: '',
    error: null,
    eventDetails: null,
    eventCopy: {},
    errorEventAttend: null
};

class ShowEvent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {...INITIAL_STATE};
    }

    handleSubmit = event => {
        let valueTable = [];
        event.preventDefault();
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.EVENT_INFO + '/' + this.state.eventId);
        if (ref) {
            ref.on('value', (data) => {
                let tableElements = [];
                if (data && data.val()) {
                    Object.entries(data.val()).forEach(([key, value]) => {
                        console.log(key, value)
                        this.state.eventCopy[key] = value;
                        if (key != "eventParticipant") {
                            tableElements.push(
                                <tr>
                                    <td className={'bootstrapEditableTable'}
                                        style={{textAlign: 'left'}}>{key.substr(5)}</td>
                                    <td className={'bootstrapEditableTable'}>{value}</td>
                                </tr>
                            )
                        } else {
                            tableElements.push(
                                <tr>
                                    <td className={'bootstrapEditableTable'}
                                        style={{textAlign: 'left'}}>{key.substr(5)}</td>
                                    <td className={'bootstrapEditableTable'}>{value.map(i => i.name).join()}</td>
                                </tr>
                            )

                        }
                    });
                    this.setState({eventDetails: tableElements});
                }

            });
        }
    };

    handleSubmitAttendEvent = event => {
        event.preventDefault();

        let neweventParticipant = {
            uid: this.props.firebase.doGetUserId(),
            name: this.props.firebase.doGetUserDisplayName()
        };
        if (!this.state.eventCopy.eventParticipant.map(i => i.uid).find(i => i === neweventParticipant.uid)) {
            this.state.eventCopy.eventParticipant.push(neweventParticipant);
            var updates = {};
            updates['/' + DATABASE_TABLES.EVENT_INFO + '/' + this.state.eventId + '/'] = this.state.eventCopy;

            this.props.firebase.database.ref().update(updates);
        } else {
            console.log('you are already going to the event')
            this.setState({errorEventAttend: "You are already going to the event"})
        }
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <div>
                <Container style={{padding: "20px"}}>
                    <Row className="justify-content-md-center">
                        <Col xs lg="6" className="justify-content-md-center">
                            <h2 style={{textAlign: 'center'}}>Event Details</h2>
                            <hr style={style.hrStyle}/>
                            <Form onSubmit={this.handleSubmit} className="justify-content-md-center">

                                <Form.Row className="justify-content-md-center">
                                    <Form.Group as={Col}>
                                        <Form.Label style={{textAlign: 'left'}}>Enter Event Id</Form.Label>
                                        <Form.Control name="eventId" onChange={this.handleChange}
                                                      placeholder={"Enter Event Id"}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row style={{textAlign: 'center'}}>
                                    <Form.Group as={Col}>
                                        <Button variant="primary" type="submit">
                                            Get Event Details
                                        </Button>

                                    </Form.Group>
                                </Form.Row>
                                {error && <p style={{color: 'red'}}>{error.message}</p>}

                                <p style={{textAlign: 'center'}}>
                                    Don't know the event id ? <Link to={ROUTES.UPCOMING_EVENT}>Click Here</Link> for
                                    Upcoming Events
                                </p>

                                {
                                    this.state.eventDetails &&
                                    <div style={{textAlign: 'center'}}>
                                        <Table striped bordered hover variant="light">
                                            <thead style={{textAlign: 'center'}}>
                                            <td colSpan={2}>Event {this.state.eventId}</td>
                                            </thead>
                                            <tbody>
                                            {this.state.eventDetails}
                                            </tbody>
                                        </Table>
                                        <Form onSubmit={this.handleSubmitAttendEvent} success={this.state.formSuccess}>
                                            <Button variant="primary" type="submit">
                                                Attend Event
                                            </Button>
                                        </Form>

                                        {this.state.errorEventAttend &&
                                        <h3 style={{color: 'red'}}>{this.state.errorEventAttend}</h3>}
                                    </div>
                                }
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withFirebase(ShowEvent);