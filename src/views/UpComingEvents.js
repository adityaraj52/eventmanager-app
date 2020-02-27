import React, {Component} from "react";
import {extractKeyValueFromArray, setUpBootstrapTable} from "../Utils";
import {DATABASE_TABLES, style} from "../constants/OtherConstants";
import BootstrapTable from 'react-bootstrap-table-next';
import {withFirebase} from '../components/Firebase';

const columnsToShow = [
    {
        fieldName: "eventId",
        aliasName: 'EVENT_ID'
    },
    {
        fieldName: "eventStartTime",
        aliasName: 'StartTime'
    },
    {
        fieldName: "eventEndTime",
        aliasName: 'EndTime'
    },
    {
        fieldName: "eventDate",
        aliasName: 'Date'
    },
    {
        fieldName: "eventCost",
        aliasName: 'EventCost'
    },
    {
        fieldName: "eventParticipants",
        aliasName: 'Participants'
    }
];

const INITIAL_STATE = {
    tableData: []
}

// Form component
class UpComingEvents extends Component {
    constructor(props) {
        super(props);
        this.state={...INITIAL_STATE};
    }

    componentDidMount() {
        this.updateCreatedEvents()
    }

    updateCreatedEvents() {
        let arrayTableData, databaseTableData;
        console.log('firebase database is', this.props)
        let ref = this.props.firebase.database.ref().child(DATABASE_TABLES.EVENT_INFO);
        if (ref) {
            ref.on('value', (data) => {
                arrayTableData = [];
                databaseTableData = data.val();
                if (databaseTableData) {
                    Object.keys(databaseTableData).forEach(entry => {
                        Object.keys(databaseTableData[entry]).forEach(entryItem => {
                            let tableRow = {}, entryItemDetail = databaseTableData[entry][entryItem];
                            if(entryItemDetail["eventModePrivate"] === "No" && entryItemDetail["eventDate"]){
                                extractKeyValueFromArray(columnsToShow, 'fieldName').forEach(columnName => {
                                    tableRow[columnName] = entryItemDetail[columnName];
                                });
                                arrayTableData.push(tableRow);
                            }
                        })
                    });
                    this.setState({
                        tableData: arrayTableData
                    });
                }
            });
        }

    }

    render() {
        return (
            <div style={{padding: '5px'}}>
                <div className="col-md-8 offset-md-2">
                    <h2 style={{textAlign: 'center'}}>Upcoming Events</h2>
                    <hr style={style.hrStyle}/>
                    <div className="">
                        <table className="table-responsive table-light">
                            <BootstrapTable keyField='createdAt'
                                            columns={setUpBootstrapTable(columnsToShow, true, 'bootstrapEditableTable')}
                                            data={this.state.tableData}/>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default withFirebase(UpComingEvents);