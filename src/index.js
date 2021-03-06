import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import FirebaseContext from "./components/Firebase/context";
import Firebase from "./components/Firebase/Firebase";
import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <App/>
        </FirebaseContext.Provider>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
