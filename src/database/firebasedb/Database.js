import Firebase from 'firebase';
import {Component} from "react";
import {DATABASE_TABLES} from "../../constants/OtherConstants";
import {isSet, verifyKeyExistsInObject} from "../../Utils";

var firebaseui = require('firebaseui');
var ui = new firebaseui.auth.AuthUI(Firebase.auth());



const databaseConfig = {
    apiKey: "AIzaSyBfxkMvtNqFqNaG0Q0Da6Uo4fSCXGLlSOg",
    authDomain: "my-project-1497208081606.firebaseapp.com",
    databaseURL: "https://my-project-1497208081606.firebaseio.com",
    projectId: "my-project-1497208081606",
    storageBucket: "my-project-1497208081606.appspot.com",
    messagingSenderId: "952994576284",
    appId: "1:952994576284:web:e644e682d089848cdcfa59",
    measurementId: "G-YE0DR7Z9HT"
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

