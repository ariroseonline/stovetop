import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import posts from "./posts";
import comments from "./comments";
import interests from "./interests";

const rootReducer = combineReducers({posts, comments, interests, routing: routerReducer});

export default rootReducer;