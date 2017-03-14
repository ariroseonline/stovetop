import firebase from "firebase";
import { convertFirebaseObjectToArrayOfObjects } from "../Utilities";

//increment
export function increment(index) {
  return {
    type: "INCREMENT_LIKES",
    index
  }
}

export function addComment(postId, author, comment) {
  return {
    type: "ADD_COMMENT",
    postId,
    author,
    comment
  }
}

export function removeComment(postId, index) {
  return {
    type: "REMOVE_COMMENT",
    postId,
    index
  }
}


export function fetchInterests() {
  var Interests = firebase.database().ref('interests');
  var UserInterests = Interests.orderByChild("user").equalTo(firebase.auth().currentUser.uid);

  return function(dispatch) {
    UserInterests.on('value', function(snapshot) {
      console.log('dispatching FETCH');
      dispatch({
        type: "FETCH_INTERESTS",
        payload: convertFirebaseObjectToArrayOfObjects(snapshot.val())
      })
    })
  }

}

export function moveInterest(interestKey, stage) {
  var Interests = firebase.database().ref('interests');
  console.log('ACTION moveINTEST', interestKey, stage)
  return function(dispatch) {
    Interests.child(interestKey).update({stage: stage});
  }

}
//
// export function swapInterestStages(toStage, fromStage, currentInterestKey, draggedInterestKey) {
//   this.firebaseRefs.interests.child(currentInterestKey).update({stage: fromStage});
//   this.firebaseRefs.interests.child(draggedInterestKey).update({stage: toStage});
// }

export function saveInterest() {

}

export function saveMaterial() {

}

export function savePerson() {

}

export function saveEvent() {

}