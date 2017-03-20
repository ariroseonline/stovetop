//takes in 2 things, the action and a copy of current state

export default function materials (state = [], action) {
  switch(action.type) {
    case "FETCH_MATERIALS":
      return action.payload
    default:
      return state;
  }
}