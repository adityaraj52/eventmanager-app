import React, {Component} from "react";
import {extractKeyValueFromArray} from "../Utils";
import {DATABASE_TABLES, style} from "../constants/OtherConstants";
import {withFirebase} from '../components/Firebase';
import {SHOW_EVENT} from "../constants/routes";
import CustomisedTable from "../components/CustomisedTable";
import {Container} from "react-bootstrap";

const cellFormatter = (cell, row) => {
    return (<div><a href="javascript:">{cell}</a></div>);
};

const onClickCells = (e, column, columnIndex, row) => {
    UpComingEvents.changeState(row.eventId);
};

const defaultSorted = [{dataField: "eventDate", order: "asc"}];

const eventIdFormatter = (cell, value) => {
    if (value) {
        let x = value.eventId
        return (<a href={"/ShowEventDetails?"+x}>Go To Event</a>)
    }
};


const columnsToShow = [
    {
        dataField: "eventId",
        text: 'EVENT_ID',
        classes: ['columnSize10Percent alignTextCenter'],
        formatter: eventIdFormatter,
        events: {onClick: onClickCells}
    },
    {
        dataField: "eventStartTime",
        text: 'StartTime',
        sort: true,
        classes: ['columnSize10Percent alignTextCenter']

    },
    {
        dataField: "eventEndTime",
        text: 'EndTime',
        sort: true,
        classes: ['columnSize10Percent alignTextCenter']

    },
    {
        dataField: "eventDate",
        text: 'Date',
        sort: true,
        classes: ['columnSize10Percent alignTextCenter']

    },
    {
        dataField: "eventCost",
        text: 'EventCost',
        sort: true,
        classes: ['columnSize10Percent alignTextCenter']

    },
    {
        dataField: "eventLocation",
        text: 'Event Location',
        sort: true,
        classes: ['bootstrapEditableTable alignTextCenter columnSize10Percent']

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
        this.state = {...INITIAL_STATE};
        UpComingEvents.changeState = UpComingEvents.changeState.bind(this)
    }

    static changeState(eventId) {
        this.props.history.push({
            pathname: SHOW_EVENT,
            state: {eventId: eventId},
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
                        if (value["eventModePrivate"] === "No" && value["eventDate"]) {
                            extractKeyValueFromArray(columnsToShow, 'dataField').forEach(columnName => {
                                console.log(columnName, tableRow[columnName])
                                if (columnName === 'eventParticipant') {
                                    tableRow[columnName] = value[columnName].map(i => i.name).join();
                                }
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
            <Container style={{padding: '20px'}}>
                {
                    <div className="">
                        <h2 style={{textAlign: 'center'}}>Upcoming Events</h2>
                        <hr style={style.hrStyle}/>
                        <div className="">
                            <CustomisedTable
                                columnStructure={columnsToShow}
                                data={this.state.tableData}
                                keyField='eventId'
                                defaultSorted={defaultSorted}
                            />
                        </div>
                    </div>
                }
            </Container>
        );
    }
}

export default withFirebase(UpComingEvents);
