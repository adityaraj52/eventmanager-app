import React from 'react';
import PropTypes from "prop-types";

const BasicTable = (props) => (
    <table striped bordered hover className="fixed">
        <tbody>
            {props.bodyContents}
        </tbody>
    </table>
);

BasicTable.propTypes = {
    bodyContents: PropTypes.object.isRequired,
};

export default BasicTable;