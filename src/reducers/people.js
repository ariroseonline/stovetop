//takes in 2 things, the action and a copy of current state

export default function people (state = [], action) {
  switch(action.type) {
    case "FETCH_PEOPLE":
      return action.payload
    default:
      return state;
  }
}