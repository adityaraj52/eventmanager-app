import React, {Component} from 'react';
import {withFirebase} from '../components/Firebase';
import {DATABASE_TABLES, style} from "../constants/OtherConstants";
import {Button, Container, Tab, Table, Tabs} from "react-bootstrap";
import CustomisedTable from "../components/CustomisedTable";
import CustomModal from "../components/BasicForm/CustomModal";

const INITIAL_STATE = {
    eventTransactions: [],
    walletBalance: 0,
    showModal: false,
    modalContents: null
};

const participantFormatter = (cell, value) => {
    if (value) {
        let cellArray = [];
        let eachParticipantShare = value.eventCost / value.eventParticipantsList.length
        Object.entries(cell).forEach((i) => {
            let cellElement = [];
            cellElement.push(<td>{i[1].name}</td>)
            cellElement.push(<td>{eachParticipantShare}</td>)
            cellArray.push(<tr>{cellElement}</tr>)
        });

        let tableBody =
            <Table>
                <tr width={"100%"}>
                    <th>Participant Name</th>
                    <th>Participant Share</th>
                </tr>
                {cellArray}
            </Table>

        return (
            <Button className={'btn btn-primary'} onClick={() => {
                MyEvents.addModalContents(tableBody);
                MyEvents.showModal();
            }}>Show</Button>
        );
    }

};

const eventIdFormatter = (cell, value) => {
    if (value) {
        let x = value.eventId
        return (<a href={"/ShowEventDetails?" + x}>Click Here</a>)
    }
};

const columnsToShow = [
    {
        dataField: "eventId",
        text: 'Event Url',
        classes: ['alignTextCenter columnSize10Percent'],
        formatter: eventIdFormatter
    },
    {
        dataField: "eventParticipantsList",
        text: 'Participants',
        formatter: participantFormatter,
        classes: ['alignTextCenter columnSize10Percent']
    },
    {
        dataField: "eventDate",
        text: 'Date',
        classes: ['alignTextCenter']
    },
    {
        dataField: "eventCost",
        text: 'Event Cost',
        classes: ['alignTextCenter']
    }
];


class MyEvents extends Component {
    constructor(props) {
        super(props);
        this.setState({...INITIAL_STATE});
        MyEvents.showModal = MyEvents.showModal.bind(this);
        MyEvents.addModalContents = MyEvents.addModalContents.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.updateCreatedEvents = this.updateCreatedEvents.bind(this);
        this.updateCreatedEventsOutgoing = this.updateCreatedEventsOutgoing.bind(this);
        switch (this.props.eventKey) {
            case "MyEvents": this.updateCreatedEvents(); break;
            case "ParticipatedEvents": this.updateCreatedEventsOutgoing(); break;
        }
    }

    static showModal() {
        this.setState({
            showModal: true
        })
    }

    hideModal() {
        this.setState({
            showModal: false
        })
    }

    static addModalContents(modalContents) {
        this.setState({
            modalContents: modalContents
        })
    }

    updateCreatedEvents() {
        let arrayTableData, databaseTableData, totalCostArray = [], participantsList = [];
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.EVENT_INFO);
        if (ref) {
            ref.on('value', (data) => {
                arrayTableData = [];
                databaseTableData = data.val();
                let userId = this.props.firebase.doGetUserId();
                if (databaseTableData) {
                    Object.values(databaseTableData).forEach((value) => {
                        if (value.eventOrganiserUID === userId) {
                            arrayTableData.push({
                                eventOrganiserId: value.eventOrganiserUID,
                                eventId: value.eventId,
                                eventCost: value.eventCost,
                                eventDate: value.eventDate,
                                eventParticipantsList: value.eventParticipant
                            });
                        }
                    });
                    this.setState({
                        eventTransactions: arrayTableData,
                        walletBalance: totalCostArray.map(i => parseFloat(i)).reduce((a, b) => (a + b), 0)
                    });
                }
            });
        }
    }

    updateCreatedEventsOutgoing() {
        let arrayTableData, databaseTableData, totalCostArray = [], participantsList = [];
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.EVENT_INFO);
        if (ref) {
            ref.on('value', (data) => {
                arrayTableData = [];
                databaseTableData = data.val();
                let userId = this.props.firebase.doGetUserId();
                if (databaseTableData) {
                    Object.values(databaseTableData).forEach((value) => {
                        if (value.eventOrganiserUID !== userId &&
                            value.eventParticipant.filter(i => i.uid === userId).length > 0) {
                            arrayTableData.push({
                                eventOrganiserId: value.eventOrganiserUID,
                                eventId: value.eventId,
                                eventCost: value.eventCost,
                                eventDate: value.eventDate,
                                eventParticipantsList: value.eventParticipant
                            });
                        }
                    });
                    this.setState({
                        eventTransactions: arrayTableData,
                        walletBalance: totalCostArray.map(i => parseFloat(i)).reduce((a, b) => (a + b), 0)
                    });
                }
            });
        }
    }

    render() {
        return (
            <div style={{padding: "5px"}}>
                {this.state &&
                <div>
                    <h3 style={{textAlign: 'center'}}>My Events</h3>
                    <hr style={style.hrStyle}/>

                    <CustomisedTable
                        columnStructure={columnsToShow}
                        data={this.state.eventTransactions}
                        keyField='eventId'/>

                    <CustomModal showModal={this.state.showModal} modalTitle={"Attendes and Cost Share"}
                                 modalBody={this.state.modalContents} closeButtonHandler={this.hideModal}/>
                </div>
                }
            </div>
        )
    }
}

const UserTransactions = (props) => (
    <Container style={{padding: "20px"}}>
        <Tabs defaultActiveKey="MyEvents" transition={false}>
            <Tab eventKey="MyEvents" title="My Events">
                <MyEvents eventKey="MyEvents" firebase={props.firebase}/>
            </Tab>
            <Tab eventKey="ParticipatedEvents" title="Attended Events">
                <MyEvents eventKey="ParticipatedEvents" firebase={props.firebase}/>
            </Tab>
        </Tabs>
    </Container>
)


export default withFirebase(UserTransactions);
