import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "../store";
import BasicHeader from "../components/BasicHeader";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {HOME, CREATE_EVENT, ADD_USER, EXISTING_USER, PAGE_NOT_AVAILABLE} from "../constants/routes";
import Home from "../views/Home";
import CreateEvent from "../views/CreateEvent";
import ExistingUser from "../views/ExistingUser";
import AddUser from "../views/AddUser";
import PageNotAvailable from "../views/PageNotAvailable";


function App() {
  return (
      <Provider store={store}>
        <div className="App" style={{ position: 'relative',minHeight: '100vh', backgroundColor: '#E9ECEF'}}>

            <BrowserRouter>
                <div>

                    <BasicHeader/>
                    <Switch>
                        <Route exact path={HOME} component={Home}/>
                        <Route exact path={CREATE_EVENT} component={CreateEvent}/>
                        <Route exact path={ADD_USER} component={AddUser}/>
                        <Route exact path={EXISTING_USER} component={ExistingUser}/>
                        <Route exact path={PAGE_NOT_AVAILABLE} component={PageNotAvailable}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
      </Provider>
  );
}

export default App;
