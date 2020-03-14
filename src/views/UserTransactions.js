import React, {Component} from 'react';
import {withFirebase} from '../components/Firebase';
import {DATABASE_TABLES} from "../constants/OtherConstants";
import {Container, Tab, Tabs} from "react-bootstrap";
import CustomisedTable from "../components/CustomisedTable";

const INITIAL_STATE = {
    eventTransactions: [],
    walletBalance: 0
};

const columnsToShow = [
    {dataField: "eventId", text: 'Event Id', classes: ['bootstrapEditableTable']},
    {dataField: "eventDate", text:'Date'},
    {dataField: "eventCost", text: 'Cost'}
];


class Transactions extends Component {
    constructor(props) {
        super(props);
        this.setState({...INITIAL_STATE});
        this.updateCreatedEvents = this.updateCreatedEvents.bind(this);
        this.updateCreatedEvents()
    }

    componentDidMount() {
        this.updateCreatedEvents()
    }

    updateCreatedEvents() {
        let arrayTableData, databaseTableData, totalCostArray = [];
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.EVENT_INFO);
        if (ref) {
            ref.on('value', (data) => {
                arrayTableData = [];
                databaseTableData = data.val();
                let userId = this.props.firebase.doGetUserId();
                if (databaseTableData) {
                    Object.values(databaseTableData).forEach((value) => {
                        value.eventParticipant.forEach(participant => {
                            if (participant.uid === userId) {
                                let totalCost = ((value.eventCost / value.eventParticipant.length).toFixed(1));
                                totalCostArray.push(totalCost);
                                arrayTableData.push({
                                        eventId: value.eventId,
                                        eventCost: value.eventCost,
                                        eventDate: value.eventDate
                                    }
                                );
                            }
                        });
                        console.log('totalcostarray ', totalCostArray)
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
            <div>
                {this.state &&
                <table className="table-responsive table-light">
                    <CustomisedTable
                        columnStructure={columnsToShow}
                        data={this.state.eventTransactions}
                        keyField='eventId'/>
                </table>
                }
            </div>
        )
    }
}

const UserTransactions = (props) => (
    <Container style={{padding: "20px"}}>
        <Tabs defaultActiveKey="UpcomingTransactions" transition={false}>
            <Tab eventKey="UpcomingTransactions" title="Upcoming Transactions">
                <Transactions firebase={props.firebase}/>
            </Tab>
            <Tab eventKey="RecentTransactions" title="RecentTransactions">
            </Tab>
        </Tabs>
    </Container>
)


export default withFirebase(UserTransactions);