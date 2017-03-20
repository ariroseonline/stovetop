//takes in 2 things, the action and a copy of current state

export default function chunks (state = [], action) {
  switch(action.type) {
    case "FETCH_CHUNKS":
      return action.payload
    default:
      return state;
  }
}