import React, {Component} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {DATABASE_TABLES, style} from "../constants/OtherConstants";
import {withFirebase} from '../components/Firebase';

const INITIAL_STATE = {
    displayName: "",
    phoneNumber: "",
    email: "",
    secondaryEmail: "",
    whatsappNumber: "",
    eventsParticipated: [],
    eventsOrganised: [],
    walletBalance: 0,
    userId: ''
};

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            userId: this.props.firebase.doGetUserId()
        });
        this.props.firebase.doSetUserProfileInfo(this.state);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount() {
        this.setState({
            displayName: this.props.firebase.doGetUserDisplayName(),
            email: this.props.firebase.doGetUserEmail()
        });
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.USER_PROFILE + '/' + this.props.firebase.doGetUserId());
        if (ref) {
            ref.on('value', (data) => {
                if (data.val())
                    this.setState(data.val())
            })
        }
    }

    render() {
        return (
            <div>
                <Container style={{padding: "20px"}}>
                    <Row className="justify-content-md-center">
                        <Col xs lg="6" className="justify-content-md-center">
                            <h2 style={{textAlign: 'center'}}>Your Account</h2>
                            <hr style={style.hrStyle}/>

                            <Form onSubmit={this.handleSubmit} success={this.state.formSuccess}
                                  error={this.state.formError}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control onChange={this.handleChange}
                                                      value={this.state.displayName}
                                                      name={"displayName"} disabled/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type={'email'}
                                                      onChange={this.handleChange}
                                                      value={this.state.email}
                                                      name={"email"} disabled/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>SecondaryEmail</Form.Label>
                                        <Form.Control type={'email'}
                                                      onChange={this.handleChange}
                                                      value={this.state.secondaryEmail}
                                                      name={"secondaryEmail"}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type={'number'}
                                                      onChange={this.handleChange}
                                                      value={this.state.phoneNumber}
                                                      name={"phoneNumber"}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>WhatsappNumber</Form.Label>
                                        <Form.Control type={'number'}
                                                      onChange={this.handleChange}
                                                      value={this.state.whatsappNumber}
                                                      name={"whatsappNumber"} required={true}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row style={{textAlign: 'center'}}>
                                    <Form.Group as={Col}>
                                        <Button variant="primary" type="submit">
                                            Update Profile
                                        </Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withFirebase(UserProfile);