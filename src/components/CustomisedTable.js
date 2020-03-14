import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import PropTypes from 'prop-types';

const CustomisedTable = (props) => (
    <div>
        <table className="table-responsive table-light">
            <BootstrapTable keyField='createdAt'
                            columns={prepareColumnData(props.columnStructure, props.nonformattedColumnNames, props.nonsortableColumnNames)}
                            data={props.data}/>
        </table>
    </div>

);

CustomisedTable.defaultProps = {
    nonformattedColumnNames: [],
    nonsortableColumnNames: [],
    defaultSorted: {}
};

CustomisedTable.propTypes = {
    keyField: PropTypes.string.isRequired,
    columnStructure: PropTypes.arrayOf(Object).isRequired,
    data: PropTypes.arrayOf(Object).isRequired,
    nonformattedColumnNames: PropTypes.arrayOf(String),
    nonsortableColumnNames: PropTypes.arrayOf(String),
    defaultSorted: PropTypes.object
};

const prepareColumnData = (columnStructure, nonformattedColumnNames, nonsortableColumnNames) => {
    columnStructure.forEach(item => {
        applyHeaderFormat(item, nonformattedColumnNames);
        applySortable(item, nonsortableColumnNames);
    });
    return columnStructure;
};

const formatHeaderText = (text) => {
    if (typeof text === "string") {
        text = <div style={{fontWeight: 'normal', textAlign: 'center'}}>
            <a href={"javascript:"} >{text}&nbsp;</a>
            <i className="fas fa-sort" style={{color: '#767d87'}}/>
        </div>
    }
    return text;
};

const applyHeaderFormat = (item, nonformattedColumnNames) => {
    if (!!nonformattedColumnNames) {
        if (!nonformattedColumnNames.includes(item["text"])) {
            item["text"] = formatHeaderText(item["text"])
        }

    }
};

const applySortable = (item, nonsortableColumnNames) => {
    if (!!nonsortableColumnNames) {
        if (!nonsortableColumnNames.includes(item["text"])) {
            item["sort"] = true
        }
    }
};

export default CustomisedTable;