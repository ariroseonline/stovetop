//takes in 2 things, the action and a copy of current state

export default function correspondences (state = [], action) {
  switch(action.type) {
    case "FETCH_CORRESPONDENCES":
      return action.payload
    default:
      return state;
  }
}

