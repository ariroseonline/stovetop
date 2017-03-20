import React, {Component, PropTypes} from "react";
import './style.css';
import {FieldGroup, convertFirebaseObjectToArrayOfObjects} from '../../Utilities';
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
import reactMixin from "react-mixin";
import firebase from "firebase";
import reactFireMixin from "reactfire";

import _ from "lodash";

class ChunkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // chunk: this.props.item,
      isDirty: false,
      resources: []
    }
    this.onUpdate = this.updateField.bind(this);
  }

  updateField(e) {
    var attribute = e.target.dataset.itemAttribute;
    var newChunk = this.state.chunk;
    newChunk[attribute] = e.target.value;
    this.setState({chunk: newChunk, isDirty: true});
  }

  saveChanges() {
    this.props.saveInterestResource();
  }

  // getResources(item) {
  //   return _.merge(item.materials, item.people, item.events);
  // }

  renderResourceList(resourceList, i) {
    return (
      <Col xs={4} key={i}>
        <h5>{resourceList.name}</h5>
        <ListGroup>
        {resourceList.map(function(chunkResource, i){
          return this.renderResource(chunkResource, i);
        }.bind(this))}
        </ListGroup>
      </Col>
    );
  }

  renderResource(resource, i) {
    console.log(resource.name);
    return (
      <ListGroupItem key={i}>
        {resource[".key"]}
      </ListGroupItem>
    )
  }

  render() {
    var resources = this.props.item.resources ? convertFirebaseObjectToArrayOfObjects(this.props.item.resources) : [];
    console.log(resources)
    var materialsResources =  resources.filter((resource) => resource.type === "materials");
    materialsResources.name = "Materials";
    var peopleResources =  resources.filter((resource) => resource.type === "people");
    peopleResources.name = "People";
    var eventsResources =  resources.filter((resource) => resource.type === "events");
    eventsResources.name = "Events";
    var resourcesByType = [];
    resourcesByType.push(materialsResources, peopleResources, eventsResources);

    return (
      <div>
        {/*{this.state.isDirty || this.props.newItemMode ? <button onClick={this.saveChanges.bind(this)}>Save</button> : null}*/}
        <h4>Resources</h4>
          <Row>
          {resourcesByType.map(function(resourceList, i) {
            return this.renderResourceList(resourceList, i);
          }.bind(this))}
        </Row>
      </div>
    );
  }
}

ChunkDetail.propTypes = {
  item: PropTypes.object,
  interestResourceType: PropTypes.string,
  newItemMode: PropTypes.bool,
  saveInterestResource: PropTypes.func
}

reactMixin(ChunkDetail.prototype, reactFireMixin)

export default ChunkDetail;
