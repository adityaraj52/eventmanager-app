import React from "react";
import {NavDropdown, Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import {ADD_USER, CREATE_EVENT, EXISTING_USER, PAGE_NOT_AVAILABLE} from "../constants/routes";

// Wire it up together, check types and export
const BasicHeader = () => (
    <div style={{width: '100%', marginBottom: '20px'}}>

        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Event Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="Membership" id="collasible-nav-dropdown">
                        <NavDropdown.Item href={ADD_USER}>Join Us</NavDropdown.Item>
                        <NavDropdown.Item href={EXISTING_USER}>Your Account</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/DeleteProfile">Delete Profile</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Events" id="collasible-nav-dropdown">
                        <NavDropdown.Item href={CREATE_EVENT}>Create Event</NavDropdown.Item>
                        <NavDropdown.Item href={PAGE_NOT_AVAILABLE}>Upcoming Event</NavDropdown.Item>
                        <NavDropdown.Item href={PAGE_NOT_AVAILABLE}>Recent Events</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={PAGE_NOT_AVAILABLE}>Delete Event</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    </div>
);

export default BasicHeader;