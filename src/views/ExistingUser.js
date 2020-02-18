import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";

class ExistingUser extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            contact: "",
            status: "",
            chatId: "",
            walletBalance: "",
            registeredEvents: "",
            last10gamesPlayed: "",
            extras: "",
            address: ""
        };
    }

    render() {
        return (
            <div>
                <div className="col-md-4 offset-md-2">
                    <h2>Membership Zone</h2>

                    <Form>
                        <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Enter your E-Mail to login ?</Form.Label>
                            <Form.Control id="emailSubmit">
                            </Form.Control>
                        </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default ExistingUser;