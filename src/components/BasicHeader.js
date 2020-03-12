import React from "react";
import {Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {CREATE_POLL, SIGN_IN, SIGN_UP} from "../constants/routes";

// Wire it up together, check types and export
const BasicHeader = () => (
    <div style={{width: '100%'}}>

        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Event Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="Events" id="collasible-nav-dropdown">
                        <NavDropdown.Item href={CREATE_POLL}>Create Poll</NavDropdown.Item>
                    </NavDropdown>
                        <NavDropdown title="Membership" id="collasible-nav-dropdown">
                        <NavDropdown.Item href={SIGN_UP}>Join Us</NavDropdown.Item>
                        <NavDropdown.Item href={SIGN_IN}>Your Account</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
                <Form inline>
                    <div style={{padding: '5px'}}>
                        <a href={SIGN_IN} className="btn btn-outline-light" style={{minWidth: '90px'}} role="button">Sign In</a>
                    </div>
                </Form>
                <Form inline>
                    <div style={{padding: '5px'}}>
                        <a href={SIGN_UP} className="btn btn-outline-light" style={{minWidth: '90px'}} role="button">Sign Up</a>
                    </div>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    </div>
);

export default BasicHeader;