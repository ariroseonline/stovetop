import React, {Component, PropTypes} from "react"
import './style.css';
// import MaterialsList from "../materials-list";
import MasterDetail from "../master-detail/master";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import firebase from "firebase";
import {getRandomId} from "../../Constants";
import reactMixin from "react-mixin"
import reactFireMixin from "reactfire"

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
    var materialsRef = firebase.database().ref('materials').orderByChild("interest").equalTo(this.props.data['.key']);
    var peopleRef = firebase.database().ref('people').orderByChild("interest").equalTo(this.props.data['.key']);
    var eventsRef = firebase.database().ref('events').orderByChild("interest").equalTo(this.props.data['.key']);
    this.bindAsArray(materialsRef, "materials");
    this.bindAsArray(peopleRef, "people");
    this.bindAsArray(eventsRef, "events");
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
            <MasterDetail items={this.state.people} itemType={"people"} createItem={this.createItem.bind(this)} saveItem={this.saveItem.bind(this)} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.state.events} itemType={"events"} createItem={this.createItem.bind(this)} saveItem={this.saveItem.bind(this)} />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

InterestCard.propTypes = {
  data: PropTypes.object
}

reactMixin(InterestCard.prototype, reactFireMixin)

export default InterestCard;
