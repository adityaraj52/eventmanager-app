import React, {Component} from 'react';
import {withFirebase} from '../components/Firebase';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {DATABASE_TABLES, style} from "../constants/OtherConstants";

const INITIAL_STATE = {
    eventId: '',
    error: null,
    eventDetails: null,
    eventCopy: {},
    errorEventAttend: null
};
const rowNames = ['eventOrganiser', 'eventOrganiserEmail', 'eventStartTime', 'eventEndTime', 'eventCost', 'eventCostSplitEqually', 'eventDate', 'eventLocation', 'eventParticipant', 'eventModePrivate', 'eventId', 'eventType', 'eventUrl', 'eventDetails', 'eventPriority' ];

class ShowEventDetails extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {...INITIAL_STATE};
    }

    componentDidMount() {
        this.handleSubmit(this.props.location.search.substr(1));
    }

    handleSubmit = eventId => {
        let valueTable = [];
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.EVENT_INFO + '/' + eventId);
        if (ref) {
            ref.on('value', (data) => {
                    let tableElements = [];
                    if (data && data.val()) {
                        for (let key of rowNames) {
                            let value = data.val()[key];
                            this.state.eventCopy[key] = value;
                            if(key === "eventParticipant"){
                                value = value.map(i => i.name).join();
                            }
                            if(value.trim().length>0){
                                tableElements.push(
                                <tr>
                                    <td className={'bootstrapEditableTable btn-secondary'} style={{textAlign: 'left'}}>{key.substr(5)}</td>
                                    <td className={'bootstrapEditableTable btn-default'} style={{color: 'black'}}>{value}</td>
                                </tr>
                            )
                            }

                        }
                        this.setState({eventDetails: tableElements});
                    }
                }
            );
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
            this.props.firebase.database.ref(DATABASE_TABLES.EVENT_INFO + '/' + this.state.eventCopy.eventId + '/').update({eventParticipant: this.state.eventCopy.eventParticipant});
        } else {
            console.log('you are already going to the event')
            this.setState({errorEventAttend: "You are already going to the event"})
        }
    };

    render() {
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <div>
                {
                    // this.state.eventDetails &&
                    <Container style={{padding: "20px"}}>
                        <Row className="justify-content-md-center">
                            <Col xs lg="6" className="justify-content-md-center">
                                <h2 style={{textAlign: 'center'}}>Event Details</h2>
                                <hr style={style.hrStyle}/>

                                <div style={{textAlign: 'center'}}>
                                    <Table striped bordered hover variant="light">
                                        <thead style={{textAlign: 'center'}}>
                                        <td className={'bootstrapEditableTable btn-warning'} style={{backgroundColor: '#c9c9d6', fontSize: '21px'}} colSpan={2}>Event {this.state.eventId}</td>
                                        </thead>
                                        <tbody>
                                        {this.state.eventDetails}
                                        </tbody>
                                    </Table>
                                    <Form onSubmit={this.handleSubmitAttendEvent} success={this.state.formSuccess}>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Button variant="primary" type="submit">
                                                    Attend Event
                                                </Button>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form>

                                    {this.state.errorEventAttend &&
                                    <h3 style={{color: 'red'}}>{this.state.errorEventAttend}</h3>}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }
            </div>
        );
    }
}

export default withFirebase(ShowEventDetails);