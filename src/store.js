import rootreducer from "./reducers/rootreducer";
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";

const initialState = {};
const middleware = [thunk];

const store = createStore(
    rootreducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store;