//takes in 2 things, the action and a copy of current state

export default function reminders (state = [], action) {
  switch(action.type) {
    case "FETCH_REMINDERS":
      return action.payload
    default:
      return state;
  }
}

