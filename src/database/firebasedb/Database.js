import Firebase from 'firebase';
import {Component} from "react";
import {DATABASE_TABLES} from "../../constants/OtherConstants";
import {isSet, verifyKeyExistsInObject} from "../../Utils";

const databaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL:process.env.REACT_APP_DATABASE_URL,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_ID,
    measurementId:process.env.REACT_APP_MEASUREMENT_ID
};

class Database extends Component {
    static databaseInstance = null;

    constructor(props) {
        super(props);
    }

    /**
     * @returns {DatabaseInstance}
     */
    static getInstance() {
        if (Database.databaseInstance == null) {
            Firebase.initializeApp(databaseConfig);
            Database.databaseInstance = Firebase.database();
        }
        return this.databaseInstance;
    }

    static pushToDatabase(databaseTableName, databaseEntryKey, data) {
        if (isSet(databaseTableName) &&
            isSet(databaseEntryKey) &&
            isSet(data) &&
            verifyKeyExistsInObject(databaseTableName, DATABASE_TABLES)) {
            Database.getInstance().ref(databaseTableName + '/' + databaseEntryKey).push(data);
            return "DATA_SAVED";
        }
    }

    static setToDatabase(databaseTableName, databaseEntryKey, data) {
        if (isSet(databaseTableName) &&
            isSet(databaseEntryKey) &&
            isSet(data) &&
            verifyKeyExistsInObject(databaseTableName, DATABASE_TABLES)) {
            Database.getInstance().ref(databaseTableName + '/' + databaseEntryKey).set(data);
            return "DATA_SAVED";
        }
    }
}

export default Database;

