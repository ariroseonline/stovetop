//takes in 2 things, the action and a copy of current state

export default function interests (state = [], action) {
  switch(action.type) {
    case "FETCH_INTERESTS":
      return action.payload
    default:
      return state;
  }
}