import React, {Component} from 'react';
import {withFirebase} from '../components/Firebase';
import * as ROUTES from '../constants/routes';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {style} from "../constants/OtherConstants";
import {Link} from "react-router-dom";
import ShowEventDetails from "../components/ShowEventDetails";
import {connect} from "react-redux";
import {doUserAuthorisation} from "../actions";

const INITIAL_STATE = {
    eventId: '',
    error: null,
    eventSubmitId: null,
    submitTrue: false
};

class ShowEvent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {...INITIAL_STATE};
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            submitTrue: true
        })
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.setState({
            submitTrue: false
        })
    };

    componentDidMount() {
        if(this.props.location && this.props.location.state){
            this.setState({
                eventId: this.props.location.search.substr(1),
                submitTrue: true
            })
            this.props.location.search = ""
        }
    }

    render() {
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === '';
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
                                        <Button variant="primary" type="submit">
                                            Get Event Details
                                        </Button>

                                    </Form.Group>
                                </Form.Row>
                                {error && <p style={{color: 'red'}}>{error.message}</p>}

                                <p style={{textAlign: 'center'}}>
                                    Don't know the event id ? <Link to={ROUTES.UPCOMING_EVENT}>Click Here</Link> for
                                    Upcoming Events
                                </p>

                                {
                                    this.state.eventId && this.state.submitTrue &&
                                    <ShowEventDetails
                                        location={{search: '?'+this.state.eventId}}/>
                                }
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withFirebase(ShowEvent);