import React, {Component} from 'react';
import {withFirebase} from '../components/Firebase';
import * as ROUTES from '../constants/routes';
import {Col, Container, Form, Row} from "react-bootstrap";
import {style} from "../constants/OtherConstants";
import {Link} from "react-router-dom";
import {BasicButton} from "../components/BasicForm/BasicButton";

const INITIAL_STATE = {
    eventId: '',
    error: null,
    eventSubmitId: null,
    submitTrue: false
};

class ShowEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const error = this.state;
        return (
            <div>
                <Container style={{padding: "20px"}}>
                    <Row className="justify-content-md-center">
                        <Col xs lg="6" className="justify-content-md-center">
                            <h2 style={{textAlign: 'center'}}>Event Details</h2>
                            <hr style={style.hrStyle}/>
                            <Form onSubmit={this.handleSubmit} className="justify-content-md-center">

                                <Form.Row className="justify-content-md-center">
                                    <Form.Group as={Col}>
                                        <Form.Label style={{textAlign: 'left'}}>Enter Event Id</Form.Label>
                                        <Form.Control name="eventId" onChange={this.handleChange}
                                                      placeholder={"Enter Event Id"} required/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row style={{textAlign: 'center'}}>
                                    <Form.Group as={Col}>
                                        <BasicButton buttonLabel={"Get Event Details"} variant="primary" type="submit" onClick={"/ShowEventDetails?"+this.state.eventId}>
                                        </BasicButton>

                                    </Form.Group>
                                </Form.Row>
                                {error && <p style={{color: 'red'}}>{error.message}</p>}

                                <p style={{textAlign: 'center'}}>
                                    Don't know the event id ? <Link to={ROUTES.UPCOMING_EVENT}>Click Here</Link> for
                                    Upcoming Events
                                </p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withFirebase(ShowEvent);
