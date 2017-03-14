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
  var interests = firebase.database().ref('interests').orderByChild("user").equalTo(firebase.auth().currentUser.uid);

  return function(dispatch) {
    interests.on('value', function(snapshot) {
      dispatch({
        type: "FETCH_INTERESTS",
        payload: convertFirebaseObjectToArrayOfObjects(snapshot.val())
      })
    })
  }

}

export function assignInterestToStage(draggedInterestKey, stage) {
}

export function swapInterestStages(toStage, fromStage, currentInterestKey, draggedInterestKey) {

}

export function saveInterest() {

}

export function saveMaterial() {

}

export function savePerson() {

}

export function saveEvent() {

}