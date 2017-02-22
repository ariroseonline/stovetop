import React, {Component, PropTypes} from "react"
import './style.css';
import MaterialsList from "../materials-list";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {
  ListGroup,
  ListGroupItem,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
  Row,
  Col,
  Button
} from "react-bootstrap";

class InterestCard extends Component {


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
            <MaterialsList/>


          </TabPanel>
          <TabPanel>
            PEOPLE!!!
          </TabPanel>
          <TabPanel>
            EVENTS AND CLASSES!!!
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
