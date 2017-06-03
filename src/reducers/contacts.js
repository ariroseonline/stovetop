//takes in 2 things, the action and a copy of current state
import { combineReducers } from "redux";

export default function recipient (state = [], action) {
  switch(action.type) {
    case "FETCH_RECIPIENT":
      return action.payload
    default:
      return state;
  }
}

