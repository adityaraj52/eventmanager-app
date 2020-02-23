import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";
import CustomisedEditableTable from "../components/CustomisedEditableTable";
import Database from "../database/firebasedb/Database";
import {DATABASE_TABLES} from "../constants/OtherConstants";

class AddUser extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            contact: "",
            status: '',
            chatId: "",
            walletBalance: 0,
            registeredEvents: 0,
            last10gamesPlayed: 0,
            extras: "",
            address: "",
            email: "",
            whatsappId: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    updateUserInfo() {
        let ref = Database.getInstance().ref().child(DATABASE_TABLES.USER_INFOS);
        let listArray, counter, arrayBootstrapTableData;
        ref.on('value', (data) => {
            counter = 1;
            listArray = [];
            arrayBootstrapTableData = [];
            var databaseTable = data.val();
            if (databaseTable) {
                var keys = Object.keys(databaseTable);
                if (keys) {
                    for (let i = 0; i < keys.length; i++) {
                        var organiserName = keys[i];
                        var eventsByOrganiser = databaseTable[organiserName];
                        var keyseventsByOrganiser = Object.keys(eventsByOrganiser);
                        for (let j = 0; j < keyseventsByOrganiser.length; j++) {
                            var keysEventDetails = Object.keys(eventsByOrganiser[keyseventsByOrganiser[j]]);
                            let tempArray = [], bootstrapTableElementItem = {
                                SNo: counter++,
                                OrganiserName: eventsByOrganiser[keyseventsByOrganiser[j]]["eventorganiserName"],
                                Location: eventsByOrganiser[keyseventsByOrganiser[j]]["eventLocation"],
                                Time: eventsByOrganiser[keyseventsByOrganiser[j]]["eventTime"],
                                Date: eventsByOrganiser[keyseventsByOrganiser[j]]["eventDate"],
                                Participants: eventsByOrganiser[keyseventsByOrganiser[j]]["eventParticipants"],
                                CreatedAt: eventsByOrganiser[keyseventsByOrganiser[j]]["eventCreatedAt"]

                            };
                            arrayBootstrapTableData.push(bootstrapTableElementItem);
                        }
                    }
                    this.setState({
                        databaseElements: listArray,
                        bootstrapTableDatabaseElements: arrayBootstrapTableData
                    });
                }
            }
        });
    }

    render() {
        return (
            <div>
                <div className="col-md-8 offset-md-2">
                    <h2>Membership Zone</h2>

                    <Form onSubmit={this.onSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control id="formGridName" placeholder="Enter your Name" required={true}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control id="formGridEmail" type="email" placeholder="Enter email"
                                              required={true}/>
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Contact</Form.Label>
                                <Form.Control id="formGridContact" type="contact" placeholder="+49123456789"
                                              required={true}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>WhatsappChat ID</Form.Label>
                                <Form.Control id="formGridWhatsAppChat" type="url" placeholder="WhatsappContact"
                                              required="optional"/>
                            </Form.Group>

                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control id="formGridAddress" placeholder="1234 Main St" required={true}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </div>

                <CustomisedEditableTable/>
            </div>
        )
    }
}

export default AddUser;