import React, {Component} from 'react';
import {withFirebase} from '../components/Firebase';
import {DATABASE_TABLES} from "../constants/OtherConstants";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";

const INITIAL_STATE = {
    eventTransactions: [],
    walletBalance: 0
};

class UserTransactions extends Component{
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
                                if(participant.uid == userId){
                                    let totalCost = value.eventCost/value.eventParticipant.length;
                                    totalCostArray.push(totalCost);
                                    arrayTableData.push(
                                        <tr>
                                            <td style={{maxWidth: '60px', overflowX: 'scroll'}}>{value.eventId}</td>
                                            <td>{value.eventDate}</td>
                                            <td>{totalCost}</td>
                                        </tr>
                                    );
                                }
                            });
                    });
                    this.setState({
                        eventTransactions: arrayTableData,
                        walletBalance: totalCostArray.reduce((a, b) => (a+b), 0)
                    });
                }
            });
        }

    }


    render() {
        return(
            <div>
                <Container style={{padding: "20px"}}>
                    <Row className="justify-content-md-center">
                        <Col xs lg="6" className="justify-content-md-center">
                            {/*<h2 style={{textAlign: 'center'}}>Event Details</h2>*/}


                            <div style={{textAlign: 'center'}}>
                                <Table striped bordered hover variant="light">
                                    <thead style={{textAlign: 'center'}}>
                                    <td className={'bootstrapEditableTable btn-warning'} style={{backgroundColor: '#c9c9d6', fontSize: '21px'}} colSpan={3}>Transactions</td>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td style={{color: "red"}}>Event ID</td>
                                        <td style={{color: "red"}}>Date</td>
                                        <td style={{color: "red"}}>Cost</td>
                                    </tr>
                                        {this.state && this.state.eventTransactions}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td style={{color: "red"}} colSpan={2}>Wallet Balance</td>
                                            <td>{this.state && this.state.walletBalance}</td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withFirebase(UserTransactions);