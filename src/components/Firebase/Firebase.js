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

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);


    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
        });


    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = [];
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });



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

    doSetInDataBase = (databaseName, value) => app.database().ref(databaseName + '/' + value.eventId).set(value);

    doSetUserProfileInfo = (userProfile) => {
        return app.database().ref(DATABASE_TABLES.USER_PROFILE + '/' + this.doGetUserId()).set({...userProfile});
    }

    doGetDisplayNameWithUID = (uid) => {
        return app.database().ref(DATABASE_TABLES.USER_PROFILE + '/' + uid).displayName;
    }

    doGetUserId = () => this.auth.getUid();

    doDatabaseTableCallBack = (tableName, callBack) => {
        return app.database().ref().child(tableName).on('value', callBack);
    };

    doUpdateEventParticipants = (eventId, callBack) => {
        this.doDatabaseTableCallBack((DATABASE_TABLES.EVENT_INFO + '/' + eventId), data => {
            return data.val().eventParticipant;
        }).then(res => {
            this.doSetInDataBase(DATABASE_TABLES.EVENT_INFO, res.push(this.doGetUserId()))
        });
    }

    doAddUserToEvent = (eventId) => {
        this.doDatabaseTableCallBack((DATABASE_TABLES.EVENT_INFO + '/' + eventId), data => {
            return data.val().eventParticipant;
        }).then(res => {
            this.doSetInDataBase(DATABASE_TABLES.EVENT_INFO, res.push(this.doGetUserId()))
        });
    };

    // *** User API ***

    user = uid => this.database.ref(`users/${uid}`);

    users = () => this.database.ref('users');


}

export default Firebase;
