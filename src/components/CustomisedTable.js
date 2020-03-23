import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import PropTypes from 'prop-types';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import {BasicButton} from "./BasicForm/BasicButton";

const columnHeaderClasses = "tableHeaderHeight fixWidthToContent alignTextCenter"

const CustomisedTable = (props) => (
    <div>
        <table className="table-responsive table-light">
            {
                <BootstrapTable keyField='createdAt'
                                columns={prepareColumnData(props.columnStructure, props.nonformattedColumnNames, props.nonsortableColumnNames, props.editableColumns)}
                                data={props.data}
                                cellEdit={!!props.editableColumns && cellEditFactory({
                                    mode: 'click',
                                    beforeSaveCell(oldValue, newValue, row, column, done) {
                                        setTimeout(() => {
                                            console.log(oldValue, newValue, row, column, done);
                                            // eslint-disable-next-line no-restricted-globals
                                            if(confirm("Do you accept changes !")){
                                                done(); // contine to save the changes
                                            } else{
                                                console.log('change rejected')
                                            }
                                        }, 0);
                                        return { async: true };
                                    }
                                })}
                />
            }
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
    defaultSorted: PropTypes.object,
    editableColumns: PropTypes.arrayOf(String),
    cellEditCallBack: PropTypes.func
};

const prepareColumnData = (columnStructure, nonformattedColumnNames, nonsortableColumnNames, editableColumns) => {
    columnStructure.forEach(item => {
        applyCellEditMode(item, editableColumns);
        applySortable(item, nonsortableColumnNames);
        applyColumnHeaderClasses(item, columnHeaderClasses);
        applyHeaderFormat(item, nonformattedColumnNames);
    });
    return columnStructure;
};

const formatHeaderText = (text) => {
    if (typeof text === "string") {
        text = <div style={{fontWeight: 'normal', textAlign: 'center'}}>
            <div className={'fixWidthToContent'}>
                <BasicButton href={"javascript:"}
                             className="btn btn-outline-light"
                             style={{...style.transparentButton}}
                             buttonLabel={<span>{text}&nbsp;<i className="fas fa-sort" style={{color: '#767d87'}}></i></span>}
                />
            </div>
        </div>
    }
    return text;
};

const style = {
    transparentButton: {
        backgroundColor: "",
        color: '#007bff',
        fontSize: '20px',
        padding: '12px 24px',
        border: 'none',
        cursor: 'pointer',
        // borderRadius: '5px',
        textAlign: 'center'
    }
};

const applyHeaderFormat = (item, nonformattedColumnNames) => {
    if (!!nonformattedColumnNames) {
        if (!nonformattedColumnNames.includes(item["text"])) {
            item["text"] = formatHeaderText(item["text"])
        }
    }
};

const applyCellEditMode = (item, editableColumns) => {
    if (!!editableColumns) {
        let colToEdit = editableColumns.filter(i => i.columnName===item["text"]);
        if(colToEdit.length > 0){
            if(!!colToEdit.editType){
                colToEdit["editType"] = Type.TEXT
            }
            item["editor"]={
                type: colToEdit[0].editType
            }
            item["editable"] = (cell, row, rowIndex, colIndex) => {

                return true;
            }
        } else {
            item.editable = () => false;
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

const applyColumnHeaderClasses = (item, classes) => {
    item["headerClasses"] = classes
}

export default CustomisedTable;