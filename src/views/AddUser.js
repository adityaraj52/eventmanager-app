import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";

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
            </div>
        )
    }
}

export default AddUser;