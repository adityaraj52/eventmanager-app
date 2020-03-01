import React, {Component} from "react";
import {extractKeyValueFromArray, setUpBootstrapTable} from "../Utils";
import {DATABASE_TABLES, style} from "../constants/OtherConstants";
import BootstrapTable from 'react-bootstrap-table-next';
import {withFirebase} from '../components/Firebase';
import ShowEventDetails from "../components/ShowEventDetails";
import {HOME, SHOW_EVENT_DETAILS} from "../constants/routes";
import {connect} from "react-redux";
import {doUserAuthorisation, getEventDetails} from "../actions";

const cellFormatter = (cell, row) => {
    return (<div><a href={'#'}>{cell}</a></div>);
};

let showUserInfo = [];

const onClickCells = (e, column, columnIndex, row, rowIndex) =>{
    UpComingEvents.changeState(row.eventId);
    showUserInfo.push(<ShowEventDetails eventId={row.eventId}/>)
};
const columnsToShow = [
    {
        dataField: "eventId",
        text: 'EVENT_ID',
        sort: true,
        classes: ['bootstrapEditableTable'],
        formatter: cellFormatter,
        events: {onClick: onClickCells}
    },
    {
        dataField: "eventStartTime",
        text: 'StartTime',
        sort: true,
        classes: ['bootstrapEditableTable']

    },
    {
        dataField: "eventEndTime",
        text: 'EndTime',
        sort: true,
        classes: ['bootstrapEditableTable']

    },
    {
        dataField: "eventDate",
        text: 'Date',
        sort: true,
        classes: ['bootstrapEditableTable']

    },
    {
        dataField: "eventCost",
        text: 'EventCost',
        sort: true,
        classes: ['bootstrapEditableTable']

    },
    {
        dataField: "eventParticipants",
        text: 'Participants'
    }
]


const INITIAL_STATE = {
    tableData: [],
    showEventDetails: []
};

// Form component
class UpComingEvents extends Component {
    constructor(props) {
        super(props);
        this.state={...INITIAL_STATE};
        UpComingEvents.changeState = UpComingEvents.changeState.bind(this)
    }

    static changeState(eventId){
        this.props.history.push({
            pathname: SHOW_EVENT_DETAILS,
            state: { eventId: eventId },
            search: eventId
        })
    }

    componentDidMount() {
        this.updateCreatedEvents()
    }

    updateCreatedEvents() {
        let arrayTableData, databaseTableData;
        let ref = this.props.firebase.database.ref(DATABASE_TABLES.EVENT_INFO);
        if (ref) {
            ref.on('value', (data) => {
                arrayTableData = [];
                databaseTableData = data.val();
                if (databaseTableData) {
                    Object.values(databaseTableData).forEach((value) => {
                            let tableRow = {};
                            if(value["eventModePrivate"] === "No" && value["eventDate"]){
                                extractKeyValueFromArray(columnsToShow, 'dataField').forEach(columnName => {
                                    tableRow[columnName] = value[columnName];
                                });
                                arrayTableData.push(tableRow);
                            }
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
                {
                <div className="col-md-8 offset-md-2">


                    <h2 style={{textAlign: 'center'}}>Upcoming Events</h2>
                    <hr style={style.hrStyle}/>
                    <div className="">
                        <table className="table-responsive table-light">
                            <BootstrapTable keyField='createdAt'
                                            columns={columnsToShow}
                                            data={this.state.tableData}/>
                        </table>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default withFirebase(UpComingEvents);