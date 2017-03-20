//takes in 2 things, the action and a copy of current state
import { combineReducers } from "redux";

export default function interests (state = [], action) {
  switch(action.type) {
    case "FETCH_INTERESTS":
      return action.payload
    case "FETCH_INTEREST_RESOURCE":
      var newInterests = [...state];
      //TODO: compose this into subreducer
      //get relevant interest
      var currentInterest = state.find(function(interest) {
        return interest['.key'] === action.interestKey;
      });

      //grab its index for later replacement
      var currentInterestIdx = state.indexOf(currentInterest);

      //edit it
      currentInterest[action.resourceType] = action.payload;


      //perform replacement of new interest into newInterests array
      newInterests[currentInterestIdx] = currentInterest;
      return newInterests;
    default:
      return state;
  }
}

