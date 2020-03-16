import React from 'react';

const BasicTable = (props) => (
    <table striped bordered hover className="fixed">
        <tbody>
            {props.bodyContents}
        </tbody>
    </table>
);

export default BasicTable;