import React from 'react'
import {Col, Container, Row} from 'react-bootstrap';
import {BasicButton} from "../components/BasicForm/BasicButton";
import {CREATE_EVENT, CREATE_POLL} from "../constants/routes";
import {BasicIconText} from "../components/BasicIconText";

const Home = (props) => (
    <Container style={{padding: '20px'}}fluid>
        <div style={{textAlign: 'center'}}>
            <h1>Organise your Events and Meetings</h1>
            <p>
                It's time to say goodbye to other pslanners. Event Tracker is everything your paper planner is and more.
                Event Tracker has it covered on all of your devices. Oh, and did we mention it's free?
            </p>
            <div className="justify-content-md-center" style={{textAlign: 'center'}}>
                <BasicButton buttonLabel={"Create Event"} onClick={CREATE_EVENT}/>
                <br/>
                <BasicButton buttonLabel={"Create Poll"} onClick={CREATE_POLL}/>
            </div>
        </div>

        <hr/>
        <div>
            <Col>
                <Row>
                    <Col>
                        <BasicIconText
                            textContent={"Not just another todo list. Keep track of more than work. Bespoke for Events, Event Tracker knows you need to keep track of more than just regular work"}
                            iconClassName={"fas fa-poll"}
                            iconLabel={"Poll"}
                            hrefLink={CREATE_POLL}/>
                    </Col>
                    <Col>
                        <BasicIconText
                            textContent={"Create a poll to know your audience. We help you to organise an event with an overview of interested participants with their metadata."}
                            iconClassName={"fa fa-tasks"}
                            iconLabel={"Tasks"}
                            hrefLink={CREATE_POLL}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BasicIconText
                            textContent={"Manage your traditional weekly schedules.Written from the ground up for event planners, Event Tracker supports timetables creation"}
                            iconClassName={"fa fa-calendar"}
                            iconLabel={"Manage"}
                            hrefLink={CREATE_POLL}/>
                    </Col>
                    <Col>
                        <BasicIconText
                            textContent={"Manage your traditional weekly schedules.Written from the ground up for event planners, Event Tracker supports timetables creation"}
                            iconClassName={"fa fa-calendar"}
                            iconLabel={"Manage"}
                            hrefLink={CREATE_POLL}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BasicIconText
                            textContent={"Reminds atendees ahead of schdeuled event. Get notified about upcoming events with email push notifications and other subscribed options."}
                            iconClassName={"fas fa-stopwatch"}
                            iconLabel={"Reminders"}
                            hrefLink={CREATE_POLL}/>
                    </Col>
                    <Col>
                        <BasicIconText
                            textContent={"Data seamlessly syncs across antendees. Your data seamlessly syncs across all of your atendees and they are notified in realtime."}
                            iconClassName={"fas fa-sync"}
                            iconLabel={"Sync"}
                            hrefLink={CREATE_POLL}/>
                    </Col>

                </Row>
            </Col>
        </div>
    </Container>
);

export default Home;