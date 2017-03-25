import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import posts from "./posts";
import comments from "./comments";
import interests from "./interests";
import correspondences from "./correspondences";
import contacts from "./contacts";

const rootReducer = combineReducers({posts, comments, interests, correspondences, contacts, routing: routerReducer});
export default rootReducer;