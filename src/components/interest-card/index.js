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

  render() {
    console.log('CARD DATA', this.props.interest)
    var interest = this.props.interest;
    return (
      <div className="interest-card">
        <InterestMetadata interestKey={interest['.key']} title={interest.title} newInterestMode={this.props.newInterestMode} saveInterestMetadata={this.props.saveInterestMetadata} saveInterestResource={this.props.saveInterestResource} />
        <Tabs>
          <TabList>
            <Tab>Chunks</Tab>
            <Tab>Materials</Tab>
            <Tab>People</Tab>
            <Tab>Events and Classes</Tab>
          </TabList>
          <TabPanel>
            <MasterDetail items={interest.chunks || []} itemType={"chunks"} createItem={this.props.createInterestResource}
                          saveItem={this.props.saveInterestResource} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={interest.materials || []} itemType={"materials"} createItem={this.props.createInterestResource}
                          saveItem={this.props.saveInterestResource} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={interest.people || []} itemType={"people"} createItem={this.props.createInterestResource}
                          saveItem={this.props.saveInterestResource} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={interest.events || []} itemType={"events"} createItem={this.props.createInterestResource}
                          saveItem={this.props.saveInterestResource} />
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
  fetchInterestResourceType: PropTypes.func
}

reactMixin(InterestCard.prototype, reactFireMixin)

export default InterestCard;
