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

    this.state = {

    }
  }

  createInterestResource(interestResourceType) {
    var newState = this.state;
    var newId = getRandomId(20);
    //push a blank new record
    newState[interestResourceType].push({
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
            <MasterDetail items={this.props.interest.chunks || []} interestResourceType={"chunks"} createInterestResource={this.createInterestResource.bind(this)}
                          saveInterestResource={this.props.saveInterestResource} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.props.interest.materials || []} interestResourceType={"materials"} createInterestResource={this.createInterestResource.bind(this)}
                          saveInterestResource={this.props.saveInterestResource} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.props.interest.people || []} interestResourceType={"people"} createInterestResource={this.createInterestResource.bind(this)}
                          saveInterestResource={this.props.saveInterestResource} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.props.interest.events || []} interestResourceType={"events"} createInterestResource={this.createInterestResource.bind(this)}
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
