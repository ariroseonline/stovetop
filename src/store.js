import { createStore, applyMiddleware, compose } from "redux";
import { syncHistoryWithStore } from "react-router-redux";
import { hashHistory } from "react-router";
import thunk from 'redux-thunk';

//import root reducer
import rootReducer from "./reducers/index";

import posts from "./data/posts"
import comments from "./data/comments"

console.log(posts, comments)
//create object for default data
const defaultState = {
  posts, comments
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)))

export const history = syncHistoryWithStore(hashHistory, store);

export default store;