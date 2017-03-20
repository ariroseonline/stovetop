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

//fetching all of these things is very similar, maybe DRY it up?
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

export function fetchInterestResource(interestKey, resourceType) {

  var InterestResource = firebase.database().ref(resourceType).orderByChild("interest").equalTo(interestKey);
  return function(dispatch) {
    InterestResource.on('value', function(snapshot) {
      console.log('dispatching FETCH resource', resourceType);
      dispatch({
        type: "FETCH_INTEREST_RESOURCE",
        interestKey: interestKey,
        resourceType: resourceType,
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

//atomic update to avoid race conditions
export function swapInterests(interestKey1, interestKey2, stage1, stage2) {
  var Interests = firebase.database().ref('interests');
  var update = {
    ["/" + interestKey1 + "/stage"] : stage1,
    ["/" + interestKey2 + "/stage"] : stage2,
  };

  return function(dispatch) {
    Interests.update(update);
  }
}

export function saveInterest() {

}

export function saveMaterial() {

}

export function savePerson() {

}

export function saveEvent() {

}