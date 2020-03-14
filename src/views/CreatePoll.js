import React, {Component} from "react";
import {getISOFormattedTodayDate} from "../Utils";
import {DATABASE_TABLES, style} from "../constants/OtherConstants";
import {Button, Col, Container, Form, Tab, Tabs} from "react-bootstrap";
import {CREATE_POLL, default as ROUTES, SHOW_EVENT_DETAILS, USER_TRANSACTIONS} from "../constants/routes";
import CustomisedTable from "../components/CustomisedTable";
import {withFirebase} from '../components/Firebase';

const onClickCells = (e, column, columnIndex, row, rowIndex) => {
    let eventKey = (row.eventOrganiser + '-' + row.eventStartTime + '-' + row.eventEndTime + '-' + row.eventDate)
    NewPoll.changeState(eventKey);
};

const columnsToShow = [
    {
        dataField: "eventOrganiser",
        text: 'Organiser',
        classes: ['bootstrapEditableTable'],
        events: {onClick: onClickCells}
    },
    {
        dataField: "eventStartTime",
        text: 'StartTime',
        classes: ['bootstrapEditableTable']

    },
    {
        dataField: "eventEndTime",
        text: 'EndTime',
        classes: ['bootstrapEditableTable']

    },
    {
        dataField: "eventDate",
        text: 'Date',
        classes: ['bootstrapEditableTable']

    },
    {
        dataField: "eventLocation",
        text: 'Location',
        classes: ['bootstrapEditableTable']

    }
];

const INITIAL_STATE = {
    eventOrganiser: "",
    eventStartTime: "11:00",
    eventEndTime: "13:30",
    eventDate: getISOFormattedTodayDate(),
    eventParticipant: [],
    eventLocation: "WaldSchulAllee 71, Berlin",
    existingEvents: null,
    error: null
};

class ExistingPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
        this.existingEvents = null;
    }

    componentDidMount() {
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.EVENT_POLL + '/');
        if (ref) {
            ref.on('value', data => {
                if (data && data.val()) {
                    let existingEvents = [];
                    Object.keys(data.val()).forEach((key, val) => {
                        existingEvents.push(data.val()[key]);
                    });
                    this.setState({
                        existingEvents: existingEvents
                    });
                }
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.existingEvents &&
                <div>
                    <h2 style={{textAlign: 'center'}}>Existing Polls</h2>
                    <hr style={style.hrStyle}/>
                    <CustomisedTable
                        columnStructure={columnsToShow}
                        keyField={'eventOrganiser + eventStartTime + eventEndTime + eventDate'}
                        data={this.state.existingEvents}/>
                </div>
                }
            </div>
        );
    }
}

const INITIAL_STATE_NEW_POLL = {
    eventOrganiser: "",
    eventStartTime: "11:00",
    eventEndTime: "13:30",
    eventDate: getISOFormattedTodayDate(),
    eventParticipant: [],
    eventLocation: "WaldSchulAllee 71, Berlin",
    existingEvents: null,
    error: null
};

class NewPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE_NEW_POLL};
        this.existingEvents = null;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        NewPoll.changeState = NewPoll.changeState.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let dataToWrite = this.state;
        delete dataToWrite.existingEvents;
        this.props.firebase.database.ref(DATABASE_TABLES.EVENT_POLL + '/' + (this.state.eventOrganiser + '-' + this.state.eventStartTime + '-' + this.state.eventEndTime + '-' + this.state.eventDate))
            .set(dataToWrite)
            .then(() => {
                this.setState({
                    error: 'Poll created Successfully '
                })
            })
            .catch(error => {
                this.setState({error});
            });
        this.setState({eventOrganiser: ""});
    }

    static changeState(eventId) {
        this.props.history.push({
            pathname: SHOW_EVENT_DETAILS,
            state: {eventId: eventId},
            search: eventId
        });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                {/*<div className="col-md-8 offset-md-2">*/}
                    <h2 style={{textAlign: 'center'}}>Create a New Poll</h2>
                    <hr style={style.hrStyle}/>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Poll Creator</Form.Label>
                                <Form.Control name="eventOrganiser"
                                              value={this.state.eventOrganiser}
                                              onChange={this.handleChange}
                                              placeholder={"First Name, Last Name"}>
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
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control name="eventStartTime"
                                              value={this.state.eventStartTime} type="time" placeholder={"12:00-14:00"}
                                              onChange={this.handleChange} required={true}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>End Time</Form.Label>
                                <Form.Control name="eventEndTime"
                                              value={this.state.eventEndTime} type="time" placeholder={"12:00-14:00"}
                                              onChange={this.handleChange} required={true}>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Location</Form.Label>
                                <Form.Control name="eventLocation"
                                              value={this.state.eventLocation} placeholder={"123 Street, London"}
                                              onChange={this.handleChange}>
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
                        {this.state.error && <h3 style={{color: 'green'}}>{this.state.error}</h3>}
                    </Form>
                </div>
            // </div>
        )
    }
}

const CreatePoll = (props) => (
    <Container style={{padding: "20px"}}>
        <Tabs defaultActiveKey="NewPoll" transition={false}>
            <Tab eventKey="NewPoll" title="Create a New Poll">
                <NewPoll firebase={props.firebase}/>
            </Tab>
            <Tab eventKey="ExisitngPolls" title="Exisitng Polls">
                <ExistingPoll firebase={props.firebase}/>
            </Tab>
        </Tabs>
    </Container>
)

export default withFirebase(CreatePoll);