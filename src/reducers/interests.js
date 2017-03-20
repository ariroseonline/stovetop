//takes in 2 things, the action and a copy of current state
import { combineReducers } from "redux";

export default function interests (state = [], action) {
  switch(action.type) {
    case "FETCH_INTERESTS":
      return action.payload
    case "FETCH_INTEREST_RESOURCE_TYPE":
      var newInterests = [...state];
      //TODO: compose this into interest-only subreducer
      //get relevant interest
      var currentInterest = state.find(function(interest) {
        return interest['.key'] === action.interestKey;
      });


      //grab its index for later replacement
      var currentInterestIdx = state.indexOf(currentInterest);

      //create new interest (immutable style)
      var newInterest = Object.assign({}, currentInterest);

      //replace it's specific resourceType array
      newInterest[action.interestResourceType] = action.payload;

      //perform replacement of new interest into newInterests array
      newInterests[currentInterestIdx] = newInterest;
      return newInterests;

    case "CREATE_INTEREST_RESOURCE":
      var interestResourceType = action.interestResourceType;
      var newInterests = [...state];

      //TODO: compose this into interest-only subreducer
      //get relevant interest
      var currentInterest = state.find(function(interest) {
        return interest['.key'] === action.interestKey;
      });

      //grab its index for later replacement
      var currentInterestIdx = state.indexOf(currentInterest);

      //create new interest (immutable style)
      var newInterest = Object.assign({}, currentInterest);

      //push to it's specific resourceType array

      newInterest[action.interestResourceType].push(action.payload)

      //perform replacement of new interest into newInterests array
      newInterests[currentInterestIdx] = newInterest;

      return newInterests;
    default:
      return state;
  }
}

