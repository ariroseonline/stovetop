import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import posts from "./posts";
import comments from "./comments";
import interests from "./interests";
import reminders from "./reminders";
import contacts from "./contacts";

const rootReducer = combineReducers({posts, comments, interests, reminders, contacts, routing: routerReducer});
export default rootReducer;