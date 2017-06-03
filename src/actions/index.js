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
      console.log('dispatching FETCH interests');
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

export function fetchReminders() {
  var Reminders = firebase.database().ref('reminders');
  var UserReminders= Reminders.orderByChild("uid").equalTo(firebase.auth().currentUser.uid);

  return function(dispatch) {
    UserReminders.on('value', function(snapshot) {
      console.log('dispatching FETCH Reminders');

      dispatch({
        type: "FETCH_REMINDERS",
        payload: convertFirebaseObjectToArrayOfObjects(snapshot.val())
      })
    })
  }
}
export function fetchRecipients() {
  var Recipients = firebase.database().ref('recipients');
  var UserRecipients = Recipients.orderByChild("uid").equalTo(firebase.auth().currentUser.uid);

  return function(dispatch) {
    UserRecipients.on('value', function(snapshot) {
      console.log('dispatching FETCH Recipients');
      dispatch({
        type: "FETCH_RECIPIENTS",
        payload: convertFirebaseObjectToArrayOfObjects(snapshot.val())
      })
    })
  }
}

export function saveRecipient(recipientData) {
  //TODO: important
  //this actions needs to
  //a) create the recipient
  //b) create reminders(s) by initializing a recurring reminder and then looking in recipientDta for any special reminders and make corr for those two, perhaps use the createReminders action
  //Wondering if it's better instead to have another action that on-watches on firebase user recipients for (add, changed) then add reminders OR find reminders to that recipient [
  // throw them out for that recipient and make new reminders (recurring and special) (only throw out recurring if recurrenceTime changed in recipientData]
  // warn user this will start timers all over again for recurring ones if they changed the recurring timewindow, or could be smarter and adjust any recurring reminder in play by DELTA of user change to recurrentTime
  var uid = firebase.auth().currentUser.uid;
  var createdAt = firebase.database.ServerValue.TIMESTAMP;
  var recipient = recipientData;

  recipient.uid = uid;
  recipient.createdAt = createdAt;

  return function(dispatch) {
    firebase.database().ref('recipients').push(recipient).then(function(recipientRef){
      if(recipientData.recurrenceTime.duration) {
        //create first reminder automatically
        createReminder(recipientRef.key)
      }
    });
  }

}

export function saveSpecialReminder(specialReminderData) {
debugger
  var uid = firebase.auth().currentUser.uid;
  var createdAt = firebase.database.ServerValue.TIMESTAMP;
  var specialReminder = specialReminderData;

  specialReminder.uid = uid;
  specialReminder.createdAt = createdAt;

  //createdAT
  //uid
  //recipient
  //recurring (true if yearly)
  //special true

  return function(dispatch) {

    // firebase.database().ref('recipients').push(recipient).then(function(recipientRef){
    //   if(recipientData.recurrenceTime.duration) {
    //     //create first reminder automatically
    //     createReminder(recipientRef.key)
    //   }
    // });
  }

}

//TODO: use this later
export function createReminder(recipientId) {
  var uid = firebase.auth().currentUser.uid;
  var createdAt = firebase.database.ServerValue.TIMESTAMP;

  //get recipient, which will have the name, recurrenceTime, etc to create reminder
  firebase.database().ref('/recipients/' + recipientId).once('value').then(function(snapshot) {
    var recipient = snapshot.val();

    var remindersRef = firebase.database().ref('reminders');

    var newReminderId = remindersRef.push({
      uid,
      recipientKey: recipient.name,
      recipientName: recipient.name, //for convenience
      createdAt,
      name: recipient.recurrenceTime.phrase,
      recurring: true,
      dueTime: moment(firebase.database.ServerValue.TIMESTAMP).add(recipient.recurrenceTime.duration).valueOf(),
      completed: false,
    });
  });

}

export function completeReminder(reminderKey) {
  var Reminder = firebase.database().ref('reminders').child(reminderKey);

  return function (dispatch) {
    //this will trigger the .on(value) of the fetchInterests action/reducer, no need to dispatch an action
    Reminder.update({
      completed: true
    });
  }

}

export function snoozeReminder(reminderKey, newDueTime) {
  var Reminder = firebase.database().ref('reminders').child(reminderKey);

  return function (dispatch) {
    //this will trigger the .on(value) of the fetchInterests action/reducer, no need to dispatch an action
    Reminder.update({
      dueTime: newDueTime
    });
  }

}