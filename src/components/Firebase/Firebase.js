import {DATABASE_TABLES} from "../../constants/OtherConstants";
import {extractKeyValueFromArray} from "../../Utils";
import firebase from "firebase";
import app from 'firebase/app';

const databaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
    constructor() {
        app.initializeApp(databaseConfig);
        this.auth = app.auth();
        this.authenticationCallBack = (callback) => app.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(app.auth().callback);
        this.database = firebase.database();
        this.firestore = app.firestore()
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);


    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doAddEvent = (eventDetail) => {
        // this.auth.ref
    }

    doCreatedEvent = (columnsToShow) => {
        let arrayTableData, databaseTableData,
            ref = app.database().ref().child(DATABASE_TABLES.EVENT_INFO);
        if (ref) {
            ref.on('value', (data) => {
                arrayTableData = [];
                databaseTableData = data.val();
                if (databaseTableData) {
                    Object.keys(databaseTableData).forEach(entry => {
                        Object.keys(databaseTableData[entry]).forEach(entryItem => {
                            let tableRow = {}, entryItemDetail = databaseTableData[entry][entryItem];
                            extractKeyValueFromArray(columnsToShow, 'fieldName').forEach(columnName => {
                                tableRow[columnName] = entryItemDetail[columnName];
                            });
                            arrayTableData.push(tableRow);
                        })
                    });
                    this.setState({
                        tableData: arrayTableData
                    });
                }
            });
        }
    }

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doGetUserDisplayName = () => this.auth.currentUser.displayName;

    doGetUserEmail = () => this.auth.currentUser.email;

    doGetUserPhoneNumber = () => this.auth.currentUser.phoneNumber;

    doSetInDataBase = (databaseName, value) => app.database().ref(databaseName+'/'+value.eventId).set(value);

    doSetUserProfileInfo = (userProfile) => {
        app.database().ref(DATABASE_TABLES.USER_PROFILE+'/'+userProfile.userId).set({...userProfile});
    }

    doGetUserId = () => this.auth.getUid();

    doDatabaseTableCallBack = (tableName, callBack) => {
        app.database().ref().child(tableName).on('value', callBack);
    };

    doUpdateEventParticipants = (eventId, callBack) => {
        let usersInEvent = [];
        this.doDatabaseTableCallBack((DATABASE_TABLES.EVENT_INFO+'/'+eventId), data => {
            return data.val().eventParticipant;
        }).then(res => {
            this.doSetInDataBase(DATABASE_TABLES.EVENT_INFO, res.push(this.doGetUserId()))
        });
    }

    doAddUserToEvent = (eventId) => {
        this.doDatabaseTableCallBack((DATABASE_TABLES.EVENT_INFO+'/'+eventId), data => {
            return data.val().eventParticipant;
        }).then(res => {
            this.doSetInDataBase(DATABASE_TABLES.EVENT_INFO, res.push(this.doGetUserId()))
        });
    };
}

export default Firebase;