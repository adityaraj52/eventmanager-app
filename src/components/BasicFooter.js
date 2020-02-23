import React from "react";

const style = {
    footerStyle: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '2.5rem',
        backgroundColor: '#343a40',
        color: 'white',
        padding: '6px 6px'

    }
}

// Wire it up together, check types and export
const BasicFooter = () => (
    <div>
    <div style={style.footerStyle} bg="dark" variant="dark">

        <span>Kontakt</span>
        &nbsp;
        &nbsp;&nbsp;
        <span>Last Visited: {new Date().toLocaleString()}</span>

    </div>
    </div>
);

export default BasicFooter;