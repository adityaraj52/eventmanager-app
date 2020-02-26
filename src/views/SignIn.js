import React, {Component} from 'react';
import {withFirebase} from '../components/Firebase';
import * as ROUTES from '../constants/routes';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {style} from "../constants/OtherConstants";
import {Link} from "react-router-dom";

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {...INITIAL_STATE};
    }

    handleSubmit = event => {
        const {email, password} = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                // window.location.href = ROUTES.HOME;
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });
        event.preventDefault();
    };
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <div>
                <Container style={{padding: "20px"}}>
                    <Row className="justify-content-md-center">
                        <Col xs lg="6" className="justify-content-md-center">
                            <h2 style={{textAlign: 'center'}}>Sign In</h2>
                            <hr style={style.hrStyle}/>
                            <Form onSubmit={this.handleSubmit} className="justify-content-md-center">

                                <Form.Row className="justify-content-md-center">
                                    <Form.Group as={Col}>
                                        <Form.Label style={{textAlign: 'left'}}>Email</Form.Label>
                                        <Form.Control name="email" type="email" onChange={this.handleChange}
                                                      placeholder={"Email Address"} value={email}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control name="password" type="password" onChange={this.handleChange}
                                                      placeholder={"Password"} value={password}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row style={{textAlign: 'center'}}>
                                    <Form.Group as={Col}>
                                        <Button variant="primary" type="submit">
                                            Sign In
                                        </Button>

                                    </Form.Group>
                                </Form.Row>
                                {error && <p style={{color: 'red'}}>{error.message}</p>}

                                <p style={{textAlign: 'center'}}>
                                    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                                </p>

                            </Form>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withFirebase(SignIn);
