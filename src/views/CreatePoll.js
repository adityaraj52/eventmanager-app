import React, {Component} from "react";
import {createDateElement, createFormElement, getISOFormattedTodayDate} from "../Utils";
import {DATABASE_TABLES, FormInputType, style} from "../constants/OtherConstants";
import {Button, Container, Modal, Tab, Tabs} from "react-bootstrap";
import {SHOW_EVENT_DETAILS} from "../constants/routes";
import CustomisedTable from "../components/CustomisedTable";
import {withFirebase} from '../components/Firebase';
import BasicTable from "../components/BasicTable";
import BasicForm from "../components/BasicForm";
import {connect} from "react-redux";
import FormElement from "../components/BasicForm/FormElement";

var md5 = require('md5');

const cellFormatter = () => {
    return (
        <Button className={'btn btn-primary'} onClick={ExistingPoll.showModal}>Attend</Button>
    );
};

const getRowKey = (eventInfo) => {
    return eventInfo.eventOrganiser + '-' + eventInfo.eventStartTime + '-' + eventInfo.eventEndTime + '-' + eventInfo.eventDate + '/';
};

const participantFormatter = (cell) => {
    if (cell) {

        let cellArray = [];
        Object.entries(cell).forEach((i) => {
            cellArray.push(<td>{i[1].name}</td>);
        });
        return (<BasicTable bodyContents={(<tbody>
        <tr>{cellArray}</tr>
        </tbody>)}/>);
    }

};

const onClickCells = (e, column, columnIndex, row) => {
    ExistingPoll.copyEventInfo(row);
};

const columnsToShow = [
    {
        dataField: "eventOrganiser",
        text: 'Organiser',
        classes: ['bootstrapEditableTable alignTextCenter'],
    },
    {
        dataField: "eventStartTime",
        text: 'StartTime',
        classes: ['bootstrapEditableTable alignTextCenter fixWidthToContent maxInlineSizefitContent'],
    },
    {
        dataField: "eventEndTime",
        text: 'EndTime',
        classes: ['bootstrapEditableTable alignTextCenter fixWidthToContent']

    },
    {
        dataField: "eventDate",
        text: 'Date',
        classes: ['bootstrapEditableTable']

    },
    {
        dataField: "eventLocation",
        text: 'Location',
        classes: ['bootstrapEditableTable alignTextCenter fixWidthToContent']
    },
    {
        dataField: "addParticipant",
        text: 'Join',
        classes: ['bootstrapEditableTable alignTextCenter fixWidthToContent maxInlineSizefitContent'],
        formatter: cellFormatter,
        events: {onClick: onClickCells}
    },
    {
        dataField: "eventParticipants",
        text: 'Participants',
        classes: ['bootstrapEditableTable'],
        formatter: participantFormatter
    }
];

const INITIAL_STATE = {
    eventOrganiser: "",
    eventStartTime: "11:00",
    eventEndTime: "13:30",
    eventDate: getISOFormattedTodayDate(),
    eventParticipants: [],
    eventLocation: "WaldSchulAllee 71, Berlin",
    existingEvents: null,
    error: null,
    show: false,
    clickedEventRow: null
};

class ExistingPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
        this.existingEvents = null;
        ExistingPoll.showModal = ExistingPoll.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        ExistingPoll.copyEventInfo = ExistingPoll.copyEventInfo.bind(this);
    }

    static showModal(rowDetails) {
        this.setState({
            show: true
        })
    };

    static copyEventInfo(rowDetails) {
        this.setState({
            clickedEventRow: getRowKey(rowDetails)
        })
    }

    hideModal() {
        this.setState({show: false});
    };

    componentDidMount() {
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.EVENT_POLL + '/');
        if (ref) {
            ref.on('value', data => {
                if (data && data.val()) {
                    let existingEvents = [];
                    Object.keys(data.val()).forEach((key) => {
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
                        data={this.state.existingEvents}
                    />
                    <MyVerticallyCenteredModal show={this.state.show} onHide={this.hideModal} hideModal={this.hideModal}
                                               firebase={this.props.firebase} selectedRow={this.state.clickedEventRow}/>
                </div>
                }
            </div>
        );
    }
}

const INITIAL_STATE_NEW_POLL = {
    eventOrganiser: "",
    email: '',
    phone: '',
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

    handleSubmit(data) {
        let dataToWrite = {};
        dataToWrite = {...data};
        delete dataToWrite.success;
        delete dataToWrite.error;
        dataToWrite["eventParticipants"] = {};
        dataToWrite["eventParticipants"][md5(this.state.email)] = {
            name: data.eventOrganiser,
            email: data.email,
            phone: data.phone,
        };

        this.props.firebase.database.ref(DATABASE_TABLES.EVENT_POLL + '/' + getRowKey(dataToWrite))
            .set(dataToWrite)
            .then(() => {
                this.setState({
                    ...INITIAL_STATE_NEW_POLL,
                    error: 'Poll created Successfully '
                })
            })
            .catch(error => {
                this.setState({error});
            });
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
                <h2 style={{textAlign: 'center'}}>Create a New Poll</h2>
                <hr style={style.hrStyle}/>
                <BasicForm
                    formElementArray={
                        {
                            0: [createFormElement({label: 'Poll Creator', name: 'eventOrganiser',placeholder: 'First Name, Last Name', isRequired: true}, FormInputType.TEXT),
                                createFormElement({label: 'Your Email', name: 'email',placeholder: 'email', isRequired: true}, FormInputType.EMAIL)],
                            1: [createFormElement({label: 'Event Date', name: 'eventDate',initialValue: getISOFormattedTodayDate(), isRequired: true}, FormInputType.DATE)],
                            2: [
                                createFormElement({label:'Start Time', name:'eventStartTime', placeholder: '12:00', isRequired: true,initialValue:  '11:30'}, FormInputType.TIME),
                                createFormElement({label:'End Time', name:'eventEndTime', placeholder: '14:00', isRequired: true, initialValue: '17:00'}, FormInputType.TIME),
                                createFormElement({label:'Phone', name:'phone', placeholder: 'Telephone', isRequired: true}, FormInputType.NUMBER),
                            ],
                            3: [createFormElement({label:'Event Location', name:'eventLocation', placeholder:'Bakers Street, London', isRequired:true}, FormInputType.TEXT)],
                        }
                    }
                    submitHandler={this.handleSubmit}/>
                {this.state.error && <h3 style={{color: 'green'}}>{this.state.error}</h3>}

            </div>
        )
    }
}

const INITIAL_MODAL_STATE = {
    name: '',
    email: '',
    phone: '',
    error: null
}

class MyVerticallyCenteredModal extends Component {

    constructor(props) {
        super(props);
        this.state = {...INITIAL_MODAL_STATE};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(data) {
        const dataToWrite = {...data};
        delete dataToWrite.error;
        delete dataToWrite.success;
        this.props.firebase.database.ref(DATABASE_TABLES.EVENT_POLL + '/' + this.props.selectedRow + '/eventParticipants')
            .push(dataToWrite)
            .then(() => {
                this.setState({
                    error: 'Thank you for attending the event '
                })
            })
            .catch(error => {
                this.setState({error});
            });
        this.props.onHide();
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter Your details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BasicForm
                        formElementArray={
                            {
                                0: [createFormElement('Enter Name', 'name', 'First Name, Last Name', true, )],
                                1: [<FormElement label={'Email'} name={'email'} placeholder={'eMail'} isRequired={true}
                                                 type={FormInputType.EMAIL}/>],
                                2: [<FormElement label={'First Name Last Name'} name={'phone'} placeholder={'phone'}
                                                 type={FormInputType.NUMBER}/>]
                            }
                        }
                        submitHandler={this.handleSubmit}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.hideModal}>Close</Button>
                </Modal.Footer>
            </Modal>
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
);

const mapStateToProps = state => {
    return {basicFormSubmitState: state.basicFormSubmitState};
};

export default connect(
    mapStateToProps
)(withFirebase(CreatePoll));