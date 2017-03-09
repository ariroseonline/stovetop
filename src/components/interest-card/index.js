import React, {Component, PropTypes} from "react"
import './style.css';
// import MaterialsList from "../materials-list";
import MasterDetail from "../master-detail/master";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import firebase from "firebase";
import {getRandomId} from "../../Constants";

class InterestCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materials: [],
      people: [],
      events: []
    }
  }

  componentDidMount() {

    //TODO: THESE COULD BE DRIED UP A LOT
    //TODO: Make interestId dynamic duh
    var materialsRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests" + "/-KcaX_EbeP821PGfuScx/materials")
    var peopleRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests" + "/-KcaX_EbeP821PGfuScx/people")
    var eventsRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests" + "/-KcaX_EbeP821PGfuScx/events")

    materialsRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var materialId = childSnapshot.val();
        //grab material object and put in array
        firebase.database().ref("materials").child(materialId).once("value", function(snapshot) {
          //TODO: this is clunky, and requires updating state after every read firebase callback. Try batching somehow.
          var newMaterials = this.state.materials;
          var newMaterial = snapshot.val();
          newMaterial.id = snapshot.key;
          newMaterials.push(newMaterial);
          this.setState({materials: newMaterials});
        }.bind(this))
      }.bind(this));
    }.bind(this));

    peopleRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var personId = childSnapshot.val();
        //grab person object and put in array
        firebase.database().ref("people").child(personId).once("value", function(snapshot) {
          //TODO: this is clunky, and requires updating state after every read firebase callback. Try batching somehow.
          var newPeople = this.state.people;
          var newPerson = snapshot.val();
          newPerson.id = snapshot.key;
          newPeople.push(newPerson);
        }.bind(this))
      }.bind(this));
    }.bind(this));

    eventsRef.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var eventId = childSnapshot.val();
        //grab event object and put in array
        firebase.database().ref("events").child(eventId).once("value", function(snapshot) {
          //TODO: this is clunky, and requires updating state after every read firebase callback. Try batching somehow.
          var newEvents = this.state.events;
          var newEvent = snapshot.val();
          newEvent.id = snapshot.key;
          newEvents.push(newEvent);
        }.bind(this))
      }.bind(this));
    }.bind(this));
  }

  createItem(itemType) {
    var newState = this.state;
    var newId = getRandomId(20);
    //push a blank new record
    newState[itemType].push({
      id: newId,
      name: "New Item"
    });

    this.setState(newState);
    return newId;
  }

  saveItem(itemType) {

  }


  render() {

    return (
      <div className="interest-card">
        <h1>{this.props.data.title}</h1>
        <Tabs>
          <TabList>
            <Tab>Materials</Tab>
            <Tab>People</Tab>
            <Tab>Events and Classes</Tab>
          </TabList>
          <TabPanel>
            <MasterDetail items={this.state.materials} itemType={"materials"} createItem={this.createItem.bind(this)} saveItem={this.saveItem.bind(this)} />
          </TabPanel>
          <TabPanel>
            {/*<MasterDetail items={this.state.people} itemType={"people"} createItem={this.createItem.bind(this)} saveItem={this.saveItem.bind(this)} />*/}
          </TabPanel>
          <TabPanel>
            {/*<MasterDetail items={this.state.events} itemType={"events"} createItem={this.createItem.bind(this)} saveItem={this.saveItem.bind(this)} />*/}
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

InterestCard.propTypes = {
  data: PropTypes.object
}

export default InterestCard;
