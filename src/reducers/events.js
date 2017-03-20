//takes in 2 things, the action and a copy of current state

export default function events (state = [], action) {
  switch(action.type) {
    case "FETCH_EVENTS":
      return action.payload
    default:
      return state;
  }
}