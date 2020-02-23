import React from 'react'
import SchoolImage from "../assets/images/eventPlanning.png";
import {Col, Container, Jumbotron, Row} from 'react-bootstrap';

const style = {
    btnStyle: {
        backgroundColor: "#1c8d76",
        color: 'white',
        fontSize: '20px',
        padding: '12px 24px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        textAlign: 'center',
        marginTop: '2%',
        backgroundSize: '100% 100%'
    },
    imgStyle: {
        maxWidth: '100%',
        minWidth: '300px',
        height: 'auto',
        marginTop: '4%',
        marginBottom: '6%',
    }
};

const Home = (props) => (
    <Jumbotron fluid style={{padding:'20px'}}>
        <Container fluid>
            <h1>Organise your Events and Meetings</h1>
            <p>
                It's time to say goodbye to other planners. Event Tracker is everything your paper planner is and more. Event Tracker has it covered on all of your devices. Oh, and did we mention it's free?
            </p>
        </Container>
         <Row className="justify-content-md-center" style={{textAlign: 'center'}}>
             <Col xs lg="6" className="justify-content-md-center" style={{textAlign: 'center'}}>
                 <a className="btn" style={style.btnStyle} href='/CreateEvent' >
                     Get Started
                 </a>
             </Col>
         </Row>
        <hr/>
        <Container fluid>
            <Col>
            <Row>
                <Col>
                    <h3><i style={{color: 'green'}} className="fa fa-calendar"><span style={{color:'black', fontWeight: 500}}>&nbsp;Manage</span></i></h3>
                    <p>Manage your traditional weekly schedules.Written from the ground up for event planners, Event Tracker supports timetables creation</p>

                </Col>
                <Col>
                    <h3><i style={{color: 'green'}} className="fa fa-tasks"><span style={{color:'black', fontWeight: 500}}>&nbsp;Tasks</span></i></h3>
                    <p>Not just another todo list. Keep track of more than work. Bespoke for Events, Event Tracker knows you need to keep track of more than just regular work</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3><i style={{color: 'green'}} className="fas fa-stopwatch"><span style={{color:'black', fontWeight: 500}}>&nbsp;Remind</span></i></h3>
                    <p>Reminds atendees ahead of schdeuled event. Get notified about upcoming events with email push notifications.</p>

                </Col>
                <Col>
                    <h3><i style={{color: 'green'}} className="fas fa-sync"><span style={{color:'black', fontWeight: 500}}>&nbsp;Sync</span></i></h3>
                    <p>Data seamlessly syncs across antendees. Your data seamlessly syncs across all of your atendees and they are notified in realtime.</p>
                </Col>
            </Row>
            </Col>
        </Container>
    </Jumbotron>
);

export default Home;