import React, {Component} from "react";
import {getISOFormattedTodayDate} from "../Utils";
import {DATABASE_TABLES, style} from "../constants/OtherConstants";
import {withFirebase} from '../components/Firebase';
import {Button, Col, Form} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import {SHOW_EVENT_DETAILS} from "../constants/routes";

//TODO: ADD FEATURE
// TO ALLOW USERS TO POSTPAY FOR THE EVENT
// PRICE FOR THE EVENT
// DROPDOWN FOR ORGANISER NAME
// Add Methods to fetch specific information
//from database like get user profileInfo and so on

const cellFormatter = (cell, row) => {
    return (<div><a href="javascript:">{cell}</a></div>);
};

const onClickCells = (e, column, columnIndex, row, rowIndex) =>{
    CreatePoll.changeState(row.eventId);
    // showUserInfo.push(<ShowEventDetails eventId={row.eventId}/>)
};

const columnsToShow = [
    {
        dataField: "eventOrganiser",
        text: 'Organiser',
        sort: true,
        classes: ['bootstrapEditableTable'],
        formatter: cellFormatter,
        events: {onClick: onClickCells}
    },
    {
        dataField: "eventStartTime",
        text: 'StartTime',
        sort: true,
        classes: ['bootstrapEditableTable']

    },
    {
        dataField: "eventEndTime",
        text: 'EndTime',
        sort: true,
        classes: ['bootstrapEditableTable']

    },
    {
        dataField: "eventDate",
        text: 'Date',
        sort: true,
        classes: ['bootstrapEditableTable']

    },
    // {
    //     dataField: "eventParticipant",
    //     text: 'Participant',
    //     sort: true,
    //     classes: ['bootstrapEditableTable']
    //
    // },
    {
        dataField: "eventLocation",
        text: 'Location',
        sort: true,
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

const RESET_STATE = {
    eventOrganiser: "",
    eventStartTime: "11:00",
    eventEndTime: "13:30",
    eventDate: getISOFormattedTodayDate(),
    eventLocation: "WaldSchulAllee 71, Berlin"
}


// Form component
class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
        this.existingEvents = null;
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        CreatePoll.changeState = CreatePoll.changeState.bind(this);
    }

    static changeState(eventId){
        this.props.history.push({
            pathname: SHOW_EVENT_DETAILS,
            state: { eventId: eventId },
            search: eventId
        })
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount() {
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.EVENT_POLL+'/');
        if(ref){
            ref.on('value', data => {
                if(data && data.val()){
                    let existingEvents = [];
                    Object.keys(data.val()).forEach((key, val)=>{
                        existingEvents.push(data.val()[key]);
                    })
                    this.setState({
                        existingEvents: existingEvents
                    });
                }
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let dataToWrite = this.state;
        delete dataToWrite.existingEvents;
        this.props.firebase.database.ref(DATABASE_TABLES.EVENT_POLL+'/'+(this.state.eventOrganiser + '-' + this.state.eventStartTime + '-' + this.state.eventEndTime + '-' + this.state.eventDate)).set(dataToWrite);
        this.setState({eventOrganiser: ""});
    }

    render() {
        return (
            <div style={{padding: '5px'}}>
                <div className="col-md-8 offset-md-2">
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
                                              value={this.state.eventStartTime} type="time" placeholder={"12:00-14:00"} onChange={this.handleChange} required={true}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>End Time</Form.Label>
                                <Form.Control name="eventEndTime"
                                              value={this.state.eventEndTime} type="time" placeholder={"12:00-14:00"} onChange={this.handleChange} required={true}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Location</Form.Label>
                                <Form.Control name="eventLocation"
                                              value={this.state.eventLocation} placeholder={"123 Street, London"} onChange={this.handleChange}>
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
                {
                    this.state.existingEvents &&

                <div className="col-md-8 offset-md-2">
                    <h2 style={{textAlign: 'center'}}>Existing Polls</h2>
                    <hr style={style.hrStyle}/>
                    <table className="table-responsive table-light">
                        <BootstrapTable keyField='createdAt'
                                        columns={columnsToShow}
                                        data={this.state.existingEvents}/>
                    </table>
                </div>
                }
                </div>
        );
    }
}


export default withFirebase(CreatePoll);