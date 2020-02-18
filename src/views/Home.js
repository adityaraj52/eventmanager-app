import React from 'react'
import {BackGroundImage} from "../constants/base64images";

const style = {
    btnStyle: {
        position: 'absolute',
        backgroundColor: "black",
        color: 'white',
        fontSize: '20px',
        padding: '12px 24px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        textAlign: 'center',
        left: '44%',
        top: '40%'
    },
    btnStyle2: {
        position: 'absolute',
        backgroundColor: "black",
        color: 'white',
        fontSize: '20px',
        padding: '12px 24px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        textAlign: 'center',
        left: '44%',
        top: '48%'
    },
};

const Home = (props) => (

    <div className="container-fluid" style={{marginTop: '-20px'}}>

        <div className="row">
            <div className="col-md-12" style={{position: "relative", textAlign: 'center', width: '100%', margin: 0}}>
                {/* eslint-disable-next-line no-undef */}
                <img src={BackGroundImage}  alt={""}/>
                <a className="btn" style={style.btnStyle} href='/CreateEvent' >
                    Create Event
                </a>
                <a className="btn" style={style.btnStyle2} href='/CreateEvent' >
                    Upcoming Events
                </a>
            </div>
        </div>
    </div>
);

export default Home;