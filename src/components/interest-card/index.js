import React, {Component, PropTypes} from "react"
import './style.css';
import MasterDetail from "../master-detail/master";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import firebase from "firebase";
import {getRandomId} from "../../Constants";
import reactMixin from "react-mixin";
import reactFireMixin from "reactfire";
import InterestMetadata from "../interest-metadata";


class InterestCard extends Component {
  constructor(props) {
    super(props);
  }
  //
  // componentDidMount() {
  //   if (!this.props.newInterestMode) {
  //     this.props.fetchInterestResource(this.props.data['.key'], 'chunks');
  //     // var materialsRef = firebase.database().ref('materials').orderByChild("interest").equalTo(this.props.data['.key']);
  //     // var peopleRef = firebase.database().ref('people').orderByChild("interest").equalTo(this.props.data['.key']);
  //     // var eventsRef = firebase.database().ref('events').orderByChild("interest").equalTo(this.props.data['.key']);
  //     // this.bindAsArray(chunksRef, "chunks");
  //     // this.bindAsArray(materialsRef, "materials");
  //     // this.bindAsArray(peopleRef, "people");
  //     // this.bindAsArray(eventsRef, "events");
  //
  //   }
  //
  // }

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

  render() {
    console.log('CARD DATA', this.props.interest)
    return (
      <div className="interest-card">
        <InterestMetadata interestKey={this.props.interest['.key']} title={this.props.interest.title} newInterestMode={this.props.newInterestMode} saveInterestMetadata={this.props.saveInterestMetadata} saveInterestResource={this.props.saveInterestResource} />
        <Tabs>
          <TabList>
            <Tab>Chunks</Tab>
            <Tab>Materials</Tab>
            <Tab>People</Tab>
            <Tab>Events and Classes</Tab>
          </TabList>
          <TabPanel>
            <MasterDetail items={this.props.interest.chunks || []} itemType={"chunks"} createItem={this.createItem.bind(this)}
                          saveInterestResource={this.props.saveInterestResource} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.props.interest.materials || []} itemType={"materials"} createItem={this.createItem.bind(this)}
                          saveInterestResource={this.props.saveInterestResource} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.props.interest.people || []} itemType={"people"} createItem={this.createItem.bind(this)}
                          saveInterestResource={this.props.saveInterestResource} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.props.interest.events || []} itemType={"events"} createItem={this.createItem.bind(this)}
                          saveInterestResource={this.props.saveInterestResource} />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

InterestCard.propTypes = {
  interest: PropTypes.object,
  newInterestMode: PropTypes.bool,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func,
  fetchInterestResource: PropTypes.func
}

reactMixin(InterestCard.prototype, reactFireMixin)

export default InterestCard;
