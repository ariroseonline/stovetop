import firebase from "firebase";
import { convertFirebaseObjectToArrayOfObjects } from "../Utilities";
import { InterestResourceStubs } from "../Constants";
var moment = require('moment');

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
  var UserInterests = Interests.orderByChild("uid").equalTo(firebase.auth().currentUser.uid);

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

export function fetchInterestResourceType(interestKey, interestResourceType) {

  var InterestResource = firebase.database().ref(interestResourceType).orderByChild("interest").equalTo(interestKey);
  return function(dispatch) {
    InterestResource.on('value', function(snapshot) {
      console.log('dispatching FETCH resource', interestResourceType);
      dispatch({
        type: "FETCH_INTEREST_RESOURCE_TYPE",
        interestKey: interestKey,
        interestResourceType: interestResourceType,
        payload: convertFirebaseObjectToArrayOfObjects(snapshot.val())
      })
    })
  }
}

export function moveInterest(interestKey, stage) {
  var Interests = firebase.database().ref('interests');
  console.log('ACTION moveINTEST', interestKey, stage)
  return function(dispatch) {
    //this will trigger the .on(value) of the fetchInterests action/reducer, no need to dispatch an action
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
    //this will trigger the .on(value) of the fetchInterests action/reducer, no need to dispatch an action
    Interests.update(update);
  }
}

export function createInterestResource(interestKey, interestResourceType) {


  //TODO: doesn't this need to do something with firebase? and use dispatch?

  return {
    type: "CREATE_INTEREST_RESOURCE",
    interestKey: interestKey,
    interestResourceType: interestResourceType,
    payload: InterestResourceStubs[interestResourceType.toUpperCase()] //TODO: make this a passed-in  object type with fields for that particular interest resource (blank values)
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

export function fetchCorrespondences() {
  var Correspondences = firebase.database().ref('correspondences');
  var UserCorrespondences = Correspondences.orderByChild("uid").equalTo(firebase.auth().currentUser.uid);

  return function(dispatch) {
    UserCorrespondences.on('value', function(snapshot) {
      console.log('dispatching FETCH Correspondences');

      dispatch({
        type: "FETCH_CORRESPONDENCES",
        payload: convertFirebaseObjectToArrayOfObjects(snapshot.val())
      })
    })
  }
}
export function fetchContacts() {
  var Contacts = firebase.database().ref('contacts');
  var UserContacts = Contacts.orderByChild("uid").equalTo(firebase.auth().currentUser.uid);

  return function(dispatch) {
    UserContacts.on('value', function(snapshot) {
      console.log('dispatching FETCH Contacts');

      dispatch({
        type: "FETCH_CONTACTS",
        payload: convertFirebaseObjectToArrayOfObjects(snapshot.val())
      })
    })
  }
}

export function saveContact(contactData) {
  var uid = firebase.auth().currentUser.uid;
  var createdAt = firebase.database.ServerValue.TIMESTAMP;
  var contact = contactData;

  contact.uid = uid;
  contact.createdAt = createdAt;
  return function(dispatch) {
    firebase.database().ref('contacts').push(contact);

  }

}

//TODO: use this later
export function saveReminder() {
  // this.props.fetchCorrespondences();
  var uid = firebase.auth().currentUser.uid;
  var createdAt = firebase.database.ServerValue.TIMESTAMP;
  var dueTime = moment(firebase.database.ServerValue.TIMESTAMP).add(90, 'days').valueOf();
  // var dueTime = moment("10-25-2017", "MM-DD-YYYY").valueOf();

  var reminder = {
    uid,
    name: "90 Day Recurring",
    recurring: true,
    createdAt,
    dueTime
  };

  var correspondencesRef = firebase.database().ref('correspondences');

  var newCorrespondenceId = correspondencesRef.push({
    uid,
    recipient: "Lebron James",
    createdAt,
    dueTime,
    completed: false,
    reminders: [reminder]
  });
}

export function completeCorrespondence(correspondenceKey) {
  var Correspondence = firebase.database().ref('correspondences').child(correspondenceKey);

  return function (dispatch) {
    //this will trigger the .on(value) of the fetchInterests action/reducer, no need to dispatch an action
    Correspondence.update({
      completed: true
    });
  }

}

export function snoozeCorrespondence(correspondenceKey, newDueTime) {
  var Correspondence = firebase.database().ref('correspondences').child(correspondenceKey);

  return function (dispatch) {
    //this will trigger the .on(value) of the fetchInterests action/reducer, no need to dispatch an action
    Correspondence.update({
      dueTime: newDueTime
    });
  }

}