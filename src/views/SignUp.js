import React, {Component} from 'react';
import * as ROUTES from '../constants/routes';
import {withFirebase} from '../components/Firebase';
import {Link, withRouter} from 'react-router-dom';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {style} from "../constants/OtherConstants";

const SignUp = () => (
    <SignUpForm/>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {username, email, passwordOne} = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });
        event.preventDefault();
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div>
                <Container style={{padding: "20px"}}>
                    <Row className="justify-content-md-center">
                        <Col xs lg="6" className="justify-content-md-center" >
                    <h2 style={{textAlign: 'center'}}>Join Us</h2>
                    <hr style={style.hrStyle}/>

                    <Form onSubmit={this.onSubmit}>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>UserName</Form.Label>
                                <Form.Control name="username" onChange={this.handleChange} placeholder={"Full Name"}
                                              value={username}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control name="email" onChange={this.handleChange} placeholder={"Email Address"}
                                              value={email}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="passwordOne" type="password" onChange={this.handleChange}
                                              placeholder={"Password"} value={passwordOne}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control name="passwordTwo" type="password" onChange={this.handleChange}
                                              placeholder={"Confirm Password"} value={passwordTwo}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row style={{textAlign: 'center'}}>
                            <Form.Group as={Col}>
                                <Button variant="primary" type="submit">
                                    Sign Up
                                </Button>

                            </Form.Group>
                        </Form.Row>
                        {error && <p>{error.message}</p>}
                        <p style={{textAlign: 'center'}}>
                            Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                        </p>
                    </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUp;

export {SignUpForm};