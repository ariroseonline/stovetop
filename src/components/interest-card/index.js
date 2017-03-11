import React, {Component, PropTypes} from "react"
import './style.css';
// import MaterialsList from "../materials-list";
import MasterDetail from "../master-detail/master";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {FieldGroup} from '../../Utilities';
import firebase from "firebase";
import {getRandomId} from "../../Constants";
import reactMixin from "react-mixin";
import reactFireMixin from "reactfire";
import InterestMetadata from "../interest-metadata";


class InterestCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: [],
      materials: [],
      people: [],
      events: []
    }
  }

  componentDidMount() {
    if (!this.props.newInterestMode) {
      var stepsRef = firebase.database().ref('steps').orderByChild("interest").equalTo(this.props.data['.key']);
      var materialsRef = firebase.database().ref('materials').orderByChild("interest").equalTo(this.props.data['.key']);
      var peopleRef = firebase.database().ref('people').orderByChild("interest").equalTo(this.props.data['.key']);
      var eventsRef = firebase.database().ref('events').orderByChild("interest").equalTo(this.props.data['.key']);
      this.bindAsArray(stepsRef, "steps");
      this.bindAsArray(materialsRef, "materials");
      this.bindAsArray(peopleRef, "people");
      this.bindAsArray(eventsRef, "events");
    }

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
        <InterestMetadata interestKey={this.props.data['.key']} title={this.props.data.title} newInterestMode={this.props.newInterestMode} saveInterestMetadata={this.props.saveInterestMetadata}/>
        <Tabs>
          <TabList>
            <Tab>Steps</Tab>
            <Tab>Materials</Tab>
            <Tab>People</Tab>
            <Tab>Events and Classes</Tab>
          </TabList>
          <TabPanel>
            <MasterDetail items={this.state.steps} itemType={"steps"} createItem={this.createItem.bind(this)}
                          saveItem={this.saveItem.bind(this)}/>
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.state.materials} itemType={"materials"} createItem={this.createItem.bind(this)}
                          saveItem={this.saveItem.bind(this)}/>
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.state.people} itemType={"people"} createItem={this.createItem.bind(this)}
                          saveItem={this.saveItem.bind(this)}/>
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.state.events} itemType={"events"} createItem={this.createItem.bind(this)}
                          saveItem={this.saveItem.bind(this)}/>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

InterestCard.propTypes = {
  data: PropTypes.object,
  newInterestMode: PropTypes.bool,
  saveInterestMetadata: PropTypes.func
}

reactMixin(InterestCard.prototype, reactFireMixin)

export default InterestCard;
