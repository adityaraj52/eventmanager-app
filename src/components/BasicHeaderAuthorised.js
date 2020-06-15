import React from "react";
import {Button, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {
    ADD_MONEY,
    CREATE_EVENT,
    CREATE_POLL,
    PAGE_NOT_AVAILABLE,
    SHOW_EVENT,
    UPCOMING_EVENT,
    USER_PROFILE,
    USER_TRANSACTIONS
} from "../constants/routes";
import {withFirebase} from '../components/Firebase/index';

// Wire it up together, check types and export
const BasicHeaderAuthorised = (props) => (
    <div style={{width: '100%'}}>

        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Event Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href={CREATE_POLL}>Polls</Nav.Link>
                    <NavDropdown title="Membership" id="collasible-nav-dropdown">
                        <NavDropdown.Item href={USER_PROFILE}>Your Account</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="/DeleteProfile">Delete Profile</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Events" id="collasible-nav-dropdown">
                        <NavDropdown.Item href={CREATE_EVENT}>Create Event</NavDropdown.Item>
                        <NavDropdown.Item href={UPCOMING_EVENT}>Upcoming Event</NavDropdown.Item>
                        <NavDropdown.Item href={PAGE_NOT_AVAILABLE}>Recent Events</NavDropdown.Item>
                        <NavDropdown.Item href={SHOW_EVENT}>Show Event</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href={PAGE_NOT_AVAILABLE}>Delete Event</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Wallet" id="collasible-nav-dropdown">
                        <NavDropdown.Item href={USER_TRANSACTIONS}>Transactions</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href={ADD_MONEY}>Add Wallet Money</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
                <Form inline>
                    {/*<a href={SIGN_OUT} className="btn btn-outline-light" role="button">Sign Out</a>*/}
                    <div>
                        <span style={{
                            color: 'white',
                            padding: '40px',
                            fontSize: '20px'
                        }}>Welcome {props.firebase.doGetUserEmail()} </span>
                        <Button onClick={props.firebase.doSignOut} className="btn btn-outline-light"
                                style={{minWidth: '90px'}} role="button">Sign
                            Out</Button>
                    </div>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    </div>
);

export default withFirebase(BasicHeaderAuthorised);